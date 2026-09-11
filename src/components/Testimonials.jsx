import { useReveal } from '../hooks/useReveal'

const TESTIMONIALS = [
  {
    quote:
      'Tenía un montón de contactos pero no sabía realmente a quién seguir. Después de ordenar todo, empecé a trabajar con prioridades claras.',
    name: 'Mariana',
    role: 'Agente inmobiliaria, Buenos Aires',
  },
  {
    quote:
      'Pensaba que mi problema era captar más. En realidad tenía oportunidades frenadas por falta de seguimiento.',
    name: 'Lucía',
    role: 'Agente independiente, Zona Oeste',
  },
  {
    quote:
      'Lo que más me sirvió fue bajar todo a un sistema simple. Dejé de trabajar apagando incendios todo el tiempo.',
    name: 'Carolina',
    role: 'Agente inmobiliaria, CABA',
  },
]

export default function Testimonials() {
  const ref = useReveal()

  return (
    <section className="section testimonials" aria-labelledby="testimonials-title" ref={ref}>
      <div className="container reveal">
        <h2 id="testimonials-title" className="section-title">
          Lo que dicen quienes ya ordenaron su negocio
        </h2>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item) => (
            <blockquote key={item.name} className="testimonial-card">
              <p>“{item.quote}”</p>
              <footer>
                <cite>{item.name}</cite>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
