import { useReveal } from '../hooks/useReveal'

const HIGHLIGHTS = [
  'Tus clientes',
  'Tu cartera',
  'Tus seguimientos',
  'Tus prioridades',
  'Tus oportunidades reales',
]

export default function NotACourse() {
  const ref = useReveal()

  return (
    <section className="section not-course" aria-labelledby="not-course-title" ref={ref}>
      <div className="container narrow reveal">
        <h2 id="not-course-title" className="section-title">
          Esto no es otro curso inmobiliario
        </h2>
        <p className="section-lead">
          No vas a recibir 40 videos para mirar ni teoría que probablemente ya conocés.
        </p>
        <ul className="highlight-list">
          {HIGHLIGHTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="closing-line">
          La idea no es que aprendas más cosas. La idea es que trabajes mejor con lo que ya
          tenés.
        </p>
      </div>
    </section>
  )
}
