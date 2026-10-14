import { useState } from 'react'
import { EBOOK } from '../config/siteConfig'
import { useReveal } from '../hooks/useReveal'
import TransferModal from './TransferModal'

export default function Ebook() {
  const ref = useReveal()
  const [showTransfer, setShowTransfer] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  const startMercadoPago = async () => {
    setCheckoutError(null)
    setCheckoutLoading(true)
    try {
      const response = await fetch('/api/ebook/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.init_point) {
        throw new Error(data.error || data.detail || 'No se pudo iniciar el pago')
      }
      window.location.href = data.init_point
    } catch (error) {
      setCheckoutError(error.message)
      setCheckoutLoading(false)
    }
  }

  return (
    <section id="ebook" className="section ebook" aria-labelledby="ebook-title" ref={ref}>
      <div className="container reveal">
        <p className="eyebrow">Producto digital</p>
        <h2 id="ebook-title" className="section-title">
          {EBOOK.name}
        </h2>
        <p className="section-lead">{EBOOK.description}</p>

        <article className="ebook-card">
          <div className="ebook-prices">
            <p className="ebook-price">{EBOOK.priceArsLabel}</p>
            <p className="ebook-price-usd">o {EBOOK.priceLabel}</p>
          </div>

          <ul className="ebook-includes">
            <li>PDF del ebook</li>
            <li>Videos prácticos (Dueño Vende, Compradores y Agente Advance)</li>
            <li>Acceso a Agente Advance</li>
            <li className="ebook-bonus">{EBOOK.bonusLabel}</li>
          </ul>

          <div className="ebook-access-notes" role="note">
            <p>
              <strong>ARS / Mercado Pago:</strong> acceso inmediato al aprobarse el pago.
            </p>
            <p>
              <strong>USD / transferencia:</strong> acceso después de confirmar la transferencia.
            </p>
          </div>

          <div className="ebook-actions">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={startMercadoPago}
              disabled={checkoutLoading}
            >
              {checkoutLoading ? 'Redirigiendo a Mercado Pago…' : EBOOK.cardLabel}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-block"
              onClick={() => setShowTransfer(true)}
            >
              {EBOOK.transferLabel}
            </button>
          </div>

          {checkoutError ? <p className="ebook-error">{checkoutError}</p> : null}
        </article>
      </div>

      <TransferModal
        plan={
          showTransfer
            ? {
                name: EBOOK.name,
                priceLabel: EBOOK.priceLabel,
                whatsappTransferMessage: EBOOK.whatsappTransferMessage,
              }
            : null
        }
        onClose={() => setShowTransfer(false)}
      />
    </section>
  )
}
