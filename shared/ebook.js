/**
 * Constantes del ebook compartidas entre front (siteConfig) y APIs de Vercel.
 * Fuente numérica / identificador — no duplicar en otros archivos.
 */

export const EBOOK_EXTERNAL_REFERENCE = 'ebook-rueda'
export const EBOOK_PRICE_USD = 15
export const EBOOK_PRICE_ARS = 20000
export const EBOOK_NAME = 'Cómo hacer girar la rueda inmobiliaria'
export const EBOOK_BONUS_NAME = 'Cómo elegir una inmobiliaria para empezar y crecer'

/** Vigencia del token de acceso: 5 años (en segundos). */
export const EBOOK_ACCESS_TTL_SECONDS = 5 * 365 * 24 * 60 * 60
