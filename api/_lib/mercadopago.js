import {
  EBOOK_EXTERNAL_REFERENCE,
  EBOOK_NAME,
  EBOOK_PRICE_ARS,
} from '../../shared/ebook.js'
import { getSiteUrl } from './ebookAccess.js'

function getAccessToken() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN
  if (!token) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN is not configured')
  }
  return token
}

async function mpFetch(path, options = {}) {
  const response = await fetch(`https://api.mercadopago.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = data?.message || data?.error || `Mercado Pago error ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.data = data
    throw error
  }
  return data
}

export async function createEbookPreference() {
  const siteUrl = getSiteUrl()

  return mpFetch('/checkout/preferences', {
    method: 'POST',
    body: JSON.stringify({
      items: [
        {
          id: EBOOK_EXTERNAL_REFERENCE,
          title: EBOOK_NAME,
          description: 'Ebook digital — AS Consultoría',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: EBOOK_PRICE_ARS,
        },
      ],
      external_reference: EBOOK_EXTERNAL_REFERENCE,
      back_urls: {
        success: `${siteUrl}/acceso-ebook`,
        failure: `${siteUrl}/#ebook`,
        pending: `${siteUrl}/#ebook`,
      },
      auto_return: 'approved',
      notification_url: `${siteUrl}/api/mercadopago/webhook`,
      statement_descriptor: 'AS CONSULTORIA',
      metadata: {
        product: EBOOK_EXTERNAL_REFERENCE,
      },
    }),
  })
}

export async function getPayment(paymentId) {
  return mpFetch(`/v1/payments/${paymentId}`)
}

/**
 * Valida un pago de Mercado Pago para el ebook.
 * @returns {{ ok: true, payment: object } | { ok: false, error: string }}
 */
export function validateEbookPayment(payment) {
  if (!payment || typeof payment !== 'object') {
    return { ok: false, error: 'Pago no encontrado' }
  }
  if (payment.status !== 'approved') {
    return { ok: false, error: `Pago no aprobado (status: ${payment.status})` }
  }
  if (payment.external_reference !== EBOOK_EXTERNAL_REFERENCE) {
    return { ok: false, error: 'La referencia del pago no corresponde al ebook' }
  }
  return { ok: true, payment }
}

export async function resolvePaymentIdFromWebhook(body, query) {
  const topic = query?.topic || query?.type || body?.type || body?.topic
  const id =
    query?.['data.id'] ||
    query?.id ||
    body?.data?.id ||
    body?.id ||
    null

  if ((topic === 'payment' || body?.action?.startsWith?.('payment.')) && id) {
    return String(id)
  }

  if (topic === 'merchant_order' || topic === 'topic_merchant_order_wh') {
    const order = await mpFetch(`/merchant_orders/${id}`)
    const paid = (order.payments || []).find((p) => p.status === 'approved')
    if (paid?.id) return String(paid.id)
  }

  if (id && (topic === 'payment' || !topic)) {
    return String(id)
  }

  return null
}
