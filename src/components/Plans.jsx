import { useState } from 'react'
import { PLANS } from '../config/siteConfig'
import { useReveal } from '../hooks/useReveal'
import TransferModal from './TransferModal'

export default function Plans() {
  const ref = useReveal()
  const [selectedPlan, setSelectedPlan] = useState(null)

  return (
    <section id="planes" className="section plans" aria-labelledby="plans-title" ref={ref}>
      <div className="container reveal">
        <h2 id="plans-title" className="section-title">
          Planes
        </h2>
        <p className="section-lead">
          Compra directa. Transferencia en USD o tarjeta en pesos con Mercado Pago.
        </p>

        <div className="plans-grid">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`plan-card ${plan.featured ? 'is-featured' : ''}`}
            >
              {plan.badge ? <span className="plan-badge">{plan.badge}</span> : null}
              <h3>{plan.name}</h3>
              <p className="plan-price">{plan.priceLabel}</p>
              <p className="plan-price-ars">{plan.priceArsLabel}</p>
              <p className="plan-desc">{plan.description}</p>
              <p className="plan-text">{plan.text}</p>

              <h4 className="plan-subtitle">Incluye</h4>
              <ul className="plan-includes">
                {plan.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="plan-ideal">
                <strong>Ideal para vos si:</strong> {plan.idealFor}
              </p>

              {plan.extraNote ? <p className="plan-extra">{plan.extraNote}</p> : null}

              <div className="plan-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={() => setSelectedPlan(plan)}
                >
                  {plan.transferLabel}
                </button>
                <a
                  href={plan.mercadoPagoUrl}
                  className="btn btn-outline btn-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cardLabel}
                </a>
              </div>

              {plan.note ? <p className="plan-note">{plan.note}</p> : null}
            </article>
          ))}
        </div>
      </div>

      <TransferModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
    </section>
  )
}
