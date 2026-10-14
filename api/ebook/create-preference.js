import { createEbookPreference } from '../_lib/mercadopago.js'
import { handleOptions, json, methodNotAllowed } from '../_lib/http.js'

export default async function handler(req, res) {
  if (handleOptions(req, res)) return

  if (req.method !== 'POST') {
    return methodNotAllowed(res, 'POST, OPTIONS')
  }

  try {
    const preference = await createEbookPreference()
    return json(res, 200, {
      id: preference.id,
      init_point: preference.init_point,
      sandbox_init_point: preference.sandbox_init_point,
    })
  } catch (error) {
    console.error('[create-preference]', error)
    const status = error.status === 401 ? 502 : 500
    return json(res, status, {
      error: 'No se pudo crear el checkout de Mercado Pago',
      detail: error.message,
    })
  }
}
