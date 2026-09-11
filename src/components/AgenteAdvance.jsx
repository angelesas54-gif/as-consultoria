import { AGENTE_ADVANCE_URL } from '../config/siteConfig'
import { useReveal } from '../hooks/useReveal'

const FEATURES = [
  'Compradores',
  'Vendedores',
  'Propiedades',
  'Seguimientos',
  'Tareas',
  'Documentación',
]

export default function AgenteAdvance() {
  const ref = useReveal()

  return (
    <section className="section agente-advance" aria-labelledby="advance-title" ref={ref}>
      <div className="container narrow reveal">
        <h2 id="advance-title" className="section-title">
          La tecnología también forma parte del sistema
        </h2>
        <p className="section-lead">
          Agente Advance nació de una necesidad real: tener en un solo lugar compradores,
          vendedores, propiedades, seguimientos, tareas y documentación.
        </p>
        <ul className="advance-list">
          {FEATURES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          Puede incorporarse como herramienta complementaria dentro del proceso de consultoría.
        </p>
        <a
          href={AGENTE_ADVANCE_URL}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Conocer Agente Advance
        </a>
      </div>
    </section>
  )
}
