import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  EBOOK_ACCESS_TTL_SECONDS,
  EBOOK_EXTERNAL_REFERENCE,
} from '../../shared/ebook.js'

function getSecret() {
  const secret = process.env.EBOOK_ACCESS_SECRET
  if (!secret) {
    throw new Error('EBOOK_ACCESS_SECRET is not configured')
  }
  return secret
}

function toBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64url')
}

function sign(body) {
  return createHmac('sha256', getSecret()).update(body).digest('base64url')
}

/**
 * @param {{ paymentId: string, email?: string }} input
 */
export function createAccessToken({ paymentId, email = '' }) {
  const iat = Math.floor(Date.now() / 1000)
  const payload = {
    pid: String(paymentId),
    email: String(email || ''),
    ref: EBOOK_EXTERNAL_REFERENCE,
    iat,
    exp: iat + EBOOK_ACCESS_TTL_SECONDS,
  }
  const body = toBase64Url(JSON.stringify(payload))
  return `${body}.${sign(body)}`
}

/**
 * @param {string | null | undefined} token
 * @returns {{ ok: true, payload: object } | { ok: false, error: string }}
 */
export function verifyAccessToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return { ok: false, error: 'Token inválido' }
  }

  const [body, signature] = token.split('.')
  if (!body || !signature) {
    return { ok: false, error: 'Token inválido' }
  }

  let expected
  try {
    expected = sign(body)
  } catch {
    return { ok: false, error: 'Configuración de acceso incompleta' }
  }

  const sigBuf = Buffer.from(signature)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return { ok: false, error: 'Token inválido' }
  }

  let payload
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return { ok: false, error: 'Token inválido' }
  }

  if (payload.ref !== EBOOK_EXTERNAL_REFERENCE) {
    return { ok: false, error: 'Token no corresponde al ebook' }
  }

  const now = Math.floor(Date.now() / 1000)
  if (!payload.exp || now > payload.exp) {
    return { ok: false, error: 'El acceso expiró' }
  }

  return { ok: true, payload }
}

export function getSiteUrl() {
  const url = process.env.SITE_URL || 'https://asconsultoria.ar'
  return url.replace(/\/$/, '')
}

export function buildAccessUrl(token) {
  return `${getSiteUrl()}/acceso-ebook?token=${encodeURIComponent(token)}`
}
