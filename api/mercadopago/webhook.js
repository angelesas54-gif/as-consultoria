import { createHmac, timingSafeEqual } from 'node:crypto'
import { createAccessToken } from '../_lib/ebookAccess.js'
import { handleOptions, json, methodNotAllowed, readJsonBody } from '../_lib/http.js'
import {
  getPayment,
  resolvePaymentIdFromWebhook,
  validateEbookPayment,
} from '../_lib/mercadopago.js'
import { sendEbookAccessEmail } from '../_lib/resend.js'

function getHeader(req, name) {
  const headers = req.headers || {}
  return headers[name] || headers[name.toLowerCase()] || ''
}

/**
 * data.id para el manifest: query `data.id` (preferido) o body.data.id.
 * Si es alfanumérico, Mercado Pago exige minúsculas.
 */
function extractSignatureDataId(query, body) {
  const raw = query?.['data.id'] ?? query?.data?.id ?? body?.data?.id
  if (raw == null || raw === '') return null
  const id = String(raw)
  return /[a-zA-Z]/.test(id) ? id.toLowerCase() : id
}

/**
 * Valida x-signature + x-request-id según el esquema de Webhooks de Mercado Pago.
 * Manifest: id:...;request-id:...;ts:...; (omite id o request-id si faltan).
 */
function verifyMercadoPagoWebhookSignature(req, query, body) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET
  if (!secret) {
    return {
      ok: false,
      status: 500,
      error: 'MERCADOPAGO_WEBHOOK_SECRET is not configured',
    }
  }

  const xSignature = String(getHeader(req, 'x-signature') || '').trim()
  const xRequestId = String(getHeader(req, 'x-request-id') || '').trim()

  if (!xSignature) {
    return { ok: false, status: 401, error: 'Missing x-signature' }
  }

  let ts
  let v1
  for (const part of xSignature.split(',')) {
    const [key, ...rest] = part.split('=')
    const k = key?.trim()
    const value = rest.join('=').trim()
    if (k === 'ts') ts = value
    if (k === 'v1') v1 = value
  }

  if (!ts || !v1) {
    return { ok: false, status: 401, error: 'Malformed x-signature' }
  }

  const dataId = extractSignatureDataId(query, body)
  const manifestParts = []
  if (dataId) manifestParts.push(`id:${dataId}`)
  if (xRequestId) manifestParts.push(`request-id:${xRequestId}`)
  manifestParts.push(`ts:${ts}`)
  const manifest = `${manifestParts.join(';')};`

  const expected = createHmac('sha256', secret).update(manifest).digest('hex')
  const expectedBuf = Buffer.from(expected, 'utf8')
  const receivedBuf = Buffer.from(v1, 'utf8')

  if (
    expectedBuf.length !== receivedBuf.length ||
    !timingSafeEqual(expectedBuf, receivedBuf)
  ) {
    return { ok: false, status: 401, error: 'Invalid webhook signature' }
  }

  return { ok: true }
}

/**
 * Webhook Mercado Pago → firma → valida pago → token → email Resend.
 * Responde 200 rápido para que MP no reintente en exceso; errores se loguean.
 */
export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST' && req.method !== 'GET') {
    return methodNotAllowed(res, 'GET, POST, OPTIONS')
  }

  try {
    const body = req.method === 'POST' ? await readJsonBody(req) : {}
    const query = req.query || {}

    const signature = verifyMercadoPagoWebhookSignature(req, query, body)
    if (!signature.ok) {
      console.error('[webhook] signature', signature.error)
      return json(res, signature.status, { error: signature.error })
    }

    const paymentId = await resolvePaymentIdFromWebhook(body, query)
    if (!paymentId) {
      return json(res, 200, { ok: true, ignored: true })
    }

    const payment = await getPayment(paymentId)
    const validation = validateEbookPayment(payment)
    if (!validation.ok) {
      return json(res, 200, { ok: true, skipped: validation.error })
    }

    const email = payment.payer?.email || ''
    const token = createAccessToken({
      paymentId: String(payment.id),
      email,
    })

    if (email) {
      try {
        await sendEbookAccessEmail({ to: email, token })
      } catch (error) {
        console.error('[webhook] resend', error)
      }
    } else {
      console.warn('[webhook] pago aprobado sin email de payer', payment.id)
    }

    return json(res, 200, { ok: true, payment_id: String(payment.id) })
  } catch (error) {
    console.error('[mercadopago/webhook]', error)
    return json(res, 500, { error: error.message })
  }
}
