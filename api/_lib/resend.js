import { EBOOK_BONUS_NAME, EBOOK_NAME } from '../../shared/ebook.js'
import { buildAccessUrl } from './ebookAccess.js'

export async function sendEbookAccessEmail({ to, token }) {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  if (!from) {
    throw new Error('EMAIL_FROM is not configured')
  }
  if (!to) {
    throw new Error('Email del comprador no disponible')
  }

  const accessUrl = buildAccessUrl(token)

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Tu acceso a “${EBOOK_NAME}”`,
      html: `
        <p>Hola,</p>
        <p>Ya está listo tu acceso al ebook <strong>${EBOOK_NAME}</strong>.</p>
        <p>Vas a poder descargar:</p>
        <ol>
          <li>${EBOOK_NAME}</li>
          <li>${EBOOK_BONUS_NAME} (bonus incluido)</li>
        </ol>
        <p>
          <a href="${accessUrl}">Entrar a mi material</a>
        </p>
        <p>Guardá este correo: el enlace es tu acceso de respaldo a los PDFs y a los videos.</p>
        <p>— AS Consultoría</p>
      `,
      text: `Tu acceso a “${EBOOK_NAME}” (incluye bonus “${EBOOK_BONUS_NAME}”): ${accessUrl}`,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data?.message || `Resend error ${response.status}`)
  }
  return data
}
