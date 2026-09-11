import { useReveal } from '../hooks/useReveal'

const PROBLEMS = [
  'Tenés muchos contactos pero no sabés a quién seguir.',
  'Trabajás todo el día pero sentís que no avanzás.',
  'Tenés propiedades estancadas y no sabés qué corregir.',
  'Seguís clientes de memoria o revisando chats.',
  'Captás pero no convertís.',
  'Terminás la semana ocupada, pero sin saber qué negocio avanzó.',
]

export default function Problems() {
  const ref = useReveal()

  return (
    <section className="section problems" aria-labelledby="problems-title" ref={ref}>
      <div className="container reveal">
        <h2 id="problems-title" className="section-title">
          ¿Te pasa alguno de estos?
        </h2>
        <ul className="problems-grid">
          {PROBLEMS.map((item) => (
            <li key={item} className="problem-card">
              <span className="problem-mark" aria-hidden="true" />
              <p>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
