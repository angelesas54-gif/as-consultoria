import { handleOptions, methodNotAllowed } from '../_lib/http.js'
import { servePrivatePdf } from '../_lib/servePrivatePdf.js'

/**
 * Entrega el PDF del ebook solo si el token de acceso es válido.
 * El archivo vive en Vercel Blob (privado) y no se expone con URL permanente pública.
 */
export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method !== 'GET') {
    return methodNotAllowed(res, 'GET, OPTIONS')
  }

  return servePrivatePdf(req, res, {
    blobUrlEnv: 'EBOOK_PDF_BLOB_URL',
    filename: 'como-hacer-girar-la-rueda-inmobiliaria.pdf',
    missingMessage: 'El PDF todavía no está configurado',
  })
}
