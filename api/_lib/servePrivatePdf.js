import { verifyAccessToken } from './ebookAccess.js'
import { json } from './http.js'

/**
 * Sirve un PDF privado desde Vercel Blob solo si el token de acceso es válido.
 * Misma mecánica que la entrega del ebook (sin URL pública permanente).
 *
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {{ blobUrlEnv: string, filename: string, missingMessage?: string }} options
 */
export async function servePrivatePdf(req, res, options) {
  const token = typeof req.query?.token === 'string' ? req.query.token : ''
  const verified = verifyAccessToken(token)
  if (!verified.ok) {
    return json(res, 401, { error: verified.error })
  }

  const blobUrl = process.env[options.blobUrlEnv]
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN

  if (!blobUrl) {
    return json(res, 503, {
      error: options.missingMessage || 'El PDF todavía no está configurado',
      detail: `Falta ${options.blobUrlEnv} en Vercel`,
    })
  }

  if (!blobToken) {
    return json(res, 503, {
      error: 'Almacenamiento no configurado',
      detail: 'Falta BLOB_READ_WRITE_TOKEN en Vercel',
    })
  }

  try {
    const upstream = await fetch(blobUrl, {
      headers: {
        Authorization: `Bearer ${blobToken}`,
      },
    })

    if (!upstream.ok) {
      return json(res, 502, {
        error: 'No se pudo leer el PDF del almacenamiento',
        detail: `Blob respondió ${upstream.status}`,
      })
    }

    const buffer = Buffer.from(await upstream.arrayBuffer())
    const contentType = upstream.headers.get('content-type') || 'application/pdf'

    res.setHeader('Content-Type', contentType)
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${options.filename}"`,
    )
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Content-Length', String(buffer.length))
    return res.status(200).send(buffer)
  } catch (error) {
    console.error('[servePrivatePdf]', options.blobUrlEnv, error)
    return json(res, 500, {
      error: 'No se pudo obtener el PDF',
      detail: error.message,
    })
  }
}
