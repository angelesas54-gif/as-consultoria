import { createAccessToken, buildAccessUrl } from '../_lib/ebookAccess.js'
import { handleOptions, json, methodNotAllowed, readJsonBody } from '../_lib/http.js'
import { sendEbookAccessEmail } from '../_lib/resend.js'
import { timingSafeEqual } from 'node:crypto'
import { randomUUID } from 'node:crypto'

function authorize(req) {
  const secret = process.env.EBOOK_GRANT_SECRET
  if (!secret) return false

  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return false

  const a = Buffer.from(token)
  const b = Buffer.from(secret)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/**
 * Liberación manual de acceso (pagos USD por transferencia).
 * POST { "email": "comprador@..." }
 * Authorization: Bearer EBOOK_GRANT_SECRET
 */
export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST, OPTIONS')
  }

  if (!authorize(req)) {
    return json(res, 401, { error: 'No autorizado' })
  }

  try {
    const body = await readJsonBody(req)
    const email = String(body.email || '').trim()
    if (!email || !email.includes('@')) {
      return json(res, 400, { error: 'Email inválido' })
    }

    const paymentId = `manual-${randomUUID()}`
    const token = createAccessToken({ paymentId, email })
    const accessUrl = buildAccessUrl(token)

    let emailSent = false
    let emailError = null
    try {
      await sendEbookAccessEmail({ to: email, token })
      emailSent = true
    } catch (error) {
      emailError = error.message
      console.error('[grant-manual] email', error)
    }

    return json(res, 200, {
      ok: true,
      accessUrl,
      token,
      email,
      emailSent,
      emailError,
    })
  } catch (error) {
    console.error('[grant-manual]', error)
    return json(res, 500, {
      error: 'No se pudo generar el acceso',
      detail: error.message,
    })
  }
}
