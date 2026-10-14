import { handleOptions, methodNotAllowed } from '../_lib/http.js'
import { servePrivatePdf } from '../_lib/servePrivatePdf.js'

/**
 * Entrega el PDF bonus solo si el token de acceso es válido.
 * Misma mecánica que /api/ebook/pdf (Blob privado + token, sin URL pública).
 */
export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET, OPTIONS')
  }

  return servePrivatePdf(req, res, {
    blobUrlEnv: 'EBOOK_BONUS_PDF_BLOB_URL',
    filename: 'como-elegir-una-inmobiliaria-para-empezar-y-crecer.pdf',
    missingMessage: 'El PDF bonus todavía no está configurado',
  })
}
