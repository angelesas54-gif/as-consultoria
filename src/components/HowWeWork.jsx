import { useReveal } from '../hooks/useReveal'

const STEPS = [
  {
    number: '01',
    title: 'Diagnóstico',
    text: 'Detectamos dónde está el desorden y qué oportunidades se están perdiendo.',
  },
  {
    number: '02',
    title: 'Orden',
    text: 'Clasificamos compradores, propiedades, seguimientos y prioridades.',
  },
  {
    number: '03',
    title: 'Implementación',
    text: 'Armamos un sistema simple que puedas aplicar en tu día a día.',
  },
  {
    number: '04',
    title: 'Seguimiento',
    text: 'Revisamos qué avanzó, qué quedó frenado y dónde poner energía.',
  },
]

export default function HowWeWork() {
  const ref = useReveal()

  return (
    <section
      id="como-trabajo"
      className="section how-we-work"
      aria-labelledby="how-title"
      ref={ref}
    >
      <div className="container reveal">
        <h2 id="how-title" className="section-title">
          Cómo trabajamos
        </h2>
        <ol className="steps-grid">
          {STEPS.map((step) => (
            <li key={step.number} className="step-card">
              <span className="step-number" aria-hidden="true">
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
