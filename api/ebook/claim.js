import { createAccessToken, verifyAccessToken } from '../_lib/ebookAccess.js'
import { handleOptions, json, methodNotAllowed, readJsonBody } from '../_lib/http.js'
import { getPayment, validateEbookPayment } from '../_lib/mercadopago.js'

/**
 * Emite o confirma un token de acceso a partir de un payment_id de Mercado Pago.
 * No confía en collection_status de la URL: revalida contra la API de MP.
 */
export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method === 'GET') {
    const token = typeof req.query?.token === 'string' ? req.query.token : ''
    const result = verifyAccessToken(token)
    if (!result.ok) {
      return json(res, 401, { error: result.error })
    }
    return json(res, 200, { ok: true, email: result.payload.email || null })
  }

  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'GET, POST, OPTIONS')
  }

  try {
    const body = await readJsonBody(req)
    const paymentId =
      body.payment_id ||
      body.paymentId ||
      req.query?.payment_id ||
      req.query?.collection_id ||
      null

    if (!paymentId) {
      return json(res, 400, { error: 'Falta payment_id' })
    }

    const payment = await getPayment(paymentId)
    const validation = validateEbookPayment(payment)
    if (!validation.ok) {
      return json(res, 402, { error: validation.error })
    }

    const email = payment.payer?.email || body.email || ''
    const token = createAccessToken({
      paymentId: String(payment.id),
      email,
    })

    return json(res, 200, {
      token,
      email: email || null,
      payment_id: String(payment.id),
    })
  } catch (error) {
    console.error('[ebook/claim]', error)
    return json(res, 500, {
      error: 'No se pudo validar el pago',
      detail: error.message,
    })
  }
}
