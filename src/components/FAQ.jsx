import { useId, useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const FAQ_ITEMS = [
  {
    q: '¿La consultoría es online?',
    a: 'Sí. Las reuniones son online y se coordinan previamente.',
  },
  {
    q: '¿Esto es solamente para agentes nuevos?',
    a: 'No. Sirve tanto para agentes nuevos como para agentes con experiencia que sienten que trabajan sin un sistema claro.',
  },
  {
    q: '¿Es un curso?',
    a: 'No. Es trabajo individual sobre tu negocio real.',
  },
  {
    q: '¿Qué pasa después del diagnóstico?',
    a: 'Podés aplicar las acciones por tu cuenta o avanzar al Plan 7 días.',
  },
  {
    q: '¿Si hago el diagnóstico y después paso al Plan 7 días pago dos veces?',
    a: 'No. Los USD 29 del diagnóstico se descuentan del valor total del Plan 7 días.',
  },
  {
    q: '¿El acompañamiento mensual tiene permanencia?',
    a: 'No. Se contrata mes a mes.',
  },
  {
    q: '¿Tengo que usar Agente Advance?',
    a: 'No necesariamente. Puede utilizarse como herramienta complementaria.',
  },
  {
    q: '¿Cómo pago?',
    a: 'Podés pagar por transferencia en USD o con tarjeta en pesos a través de Mercado Pago.',
  },
  {
    q: '¿Las reuniones son individuales?',
    a: 'Sí.',
  },
]

function FaqItem({ item, index, openIndex, setOpenIndex }) {
  const panelId = useId()
  const buttonId = useId()
  const isOpen = openIndex === index

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <h3>
        <button
          type="button"
          id={buttonId}
          className="faq-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? -1 : index)}
        >
          <span>{item.q}</span>
          <span className="faq-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-panel"
        hidden={!isOpen}
      >
        <p>{item.a}</p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const ref = useReveal()
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section faq" aria-labelledby="faq-title" ref={ref}>
      <div className="container narrow reveal">
        <h2 id="faq-title" className="section-title">
          Preguntas frecuentes
        </h2>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => (
            <FaqItem
              key={item.q}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
