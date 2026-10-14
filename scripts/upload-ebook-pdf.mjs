/**
 * Sube el PDF del ebook a Vercel Blob (privado) y muestra la URL
 * para cargar en EBOOK_PDF_BLOB_URL.
 *
 * Uso:
 *   set BLOB_READ_WRITE_TOKEN=...
 *   node scripts/upload-ebook-pdf.mjs ruta/al/archivo.pdf
 */

import { readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'

const token = process.env.BLOB_READ_WRITE_TOKEN
const filePath = process.argv[2]

if (!token) {
  console.error('Falta BLOB_READ_WRITE_TOKEN')
  process.exit(1)
}

if (!filePath) {
  console.error('Uso: node scripts/upload-ebook-pdf.mjs <archivo.pdf>')
  process.exit(1)
}

const absolute = resolve(filePath)
const body = readFileSync(absolute)
const filename = basename(absolute)

const response = await fetch('https://blob.vercel-storage.com', {
  method: 'PUT',
  headers: {
    Authorization: `Bearer ${token}`,
    'x-vercel-blob-access': 'private',
    'x-content-type': 'application/pdf',
    'x-vercel-blob-pathname': `ebooks/${filename}`,
  },
  body,
})

const data = await response.json().catch(() => ({}))
if (!response.ok) {
  console.error('Error al subir:', data)
  process.exit(1)
}

console.log('Subida OK.')
console.log('Pegá esto en Vercel como EBOOK_PDF_BLOB_URL:')
console.log(data.url)
