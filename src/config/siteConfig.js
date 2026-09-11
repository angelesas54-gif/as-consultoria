/**
 * Configuración centralizada de AS Consultoría.
 * Editá aquí dominios, links, precios y datos bancarios.
 */

export const DOMAIN = 'https://asconsultoria.ar'

export const WHATSAPP_NUMBER = '5491156039275'
export const WHATSAPP_DISPLAY = '+54 9 11 5603-9275'

export const INSTAGRAM_URL = 'https://www.instagram.com/asconsultoria.ar'
export const AGENTE_ADVANCE_URL = 'https://agenteadvance.com'

export const MERCADOPAGO = {
  diagnostico: 'https://mpago.la/15L8nKq',
  plan7: 'https://mpago.la/2HeEnV9',
  mensual: 'https://mpago.la/17UbuVP',
}

export const GALICIA = {
  titular: 'Ángeles Aida Sala',
  alias: 'asconsultoria',
  cbu: '0070250031004045818138',
}

export const PRICES_USD = {
  diagnostico: 29,
  plan7: 99,
  mensual: 150,
}

export const PRICES_ARS = {
  diagnostico: 49000,
  plan7: 165000,
  mensual: 250000,
}

export const PLANS = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico Express',
    priceUsd: PRICES_USD.diagnostico,
    priceArs: PRICES_ARS.diagnostico,
    priceLabel: 'USD 29',
    priceArsLabel: '$49.000 ARS',
    description: '¿Sentís que trabajás mucho pero no sabés dónde se te están escapando oportunidades?',
    text: 'En una reunión individual revisamos cómo estás trabajando hoy y detectamos los principales puntos de desorden.',
    includes: [
      'Reunión individual de 30–40 minutos',
      'Revisión de seguimiento, cartera y organización',
      'Detección de oportunidades que pueden estar quedando sin trabajar',
      'Identificación de los principales puntos a corregir',
      '3 acciones concretas para implementar de inmediato',
    ],
    idealFor: 'Necesitás claridad antes de decidir qué cambiar.',
    transferLabel: 'Pagar USD 29 por transferencia',
    cardLabel: 'Pagar $49.000 con tarjeta',
    mercadoPagoUrl: MERCADOPAGO.diagnostico,
    featured: false,
    note: 'Si después avanzás al Plan 7 días, los USD 29 se descuentan del valor total.',
    whatsappTransferMessage:
      'Hola Ángeles, ya hice la transferencia del Diagnóstico Express. Te envío el comprobante para coordinar.',
  },
  {
    id: 'plan7',
    name: 'Plan 7 días',
    priceUsd: PRICES_USD.plan7,
    priceArs: PRICES_ARS.plan7,
    priceLabel: 'USD 99',
    priceArsLabel: '$165.000 ARS',
    badge: 'Más elegido',
    description: 'Necesitás algo más que detectar el problema: necesitás ordenarlo.',
    text: 'Durante 7 días trabajamos juntas sobre tu negocio real para dejar armado un sistema simple de seguimiento y prioridades.',
    includes: [
      '2 encuentros individuales',
      'Orden de compradores activos',
      'Revisión y clasificación de propiedades',
      'Priorización de contactos',
      'Sistema de seguimiento',
      'Organización de próximas acciones',
      'Rutina comercial semanal',
      'Plan concreto para los siguientes 30 días',
    ],
    idealFor:
      'Tenés clientes y oportunidades, pero sentís que todo está disperso y dependés demasiado de tu memoria o de WhatsApp.',
    transferLabel: 'Pagar USD 99 por transferencia',
    cardLabel: 'Pagar $165.000 con tarjeta',
    mercadoPagoUrl: MERCADOPAGO.plan7,
    featured: true,
    whatsappTransferMessage:
      'Hola Ángeles, ya hice la transferencia del Plan 7 días. Te envío el comprobante para coordinar.',
  },
  {
    id: 'mensual',
    name: 'Acompañamiento mensual',
    priceUsd: PRICES_USD.mensual,
    priceArs: PRICES_ARS.mensual,
    priceLabel: 'USD 150 / mes',
    priceArsLabel: '$250.000 ARS / mes',
    description: 'No necesitás que alguien te diga una vez qué hacer. Necesitás sostenerlo.',
    text: 'Trabajamos mes a mes revisando qué avanzó, qué quedó frenado y dónde poner tu energía comercial.',
    includes: [
      '2 reuniones individuales por mes',
      'Revisión de cartera',
      'Seguimiento de compradores',
      'Revisión de oportunidades activas',
      'Ajustes de estrategia',
      'Organización comercial',
      'Definición de prioridades',
      'Planificación del mes siguiente',
    ],
    idealFor: 'Querés tener alguien que mire tu negocio con vos y te ayude a mantener el foco.',
    extraNote: 'Sin permanencia. Mes a mes.',
    transferLabel: 'Pagar USD 150 por transferencia',
    cardLabel: 'Pagar $250.000 con tarjeta',
    mercadoPagoUrl: MERCADOPAGO.mensual,
    featured: false,
    whatsappTransferMessage:
      'Hola Ángeles, ya hice la transferencia del Acompañamiento mensual. Te envío el comprobante para coordinar.',
  },
]

export function getWhatsAppUrl(message) {
  const text = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}

export function formatArs(amount) {
  return amount.toLocaleString('es-AR')
}
