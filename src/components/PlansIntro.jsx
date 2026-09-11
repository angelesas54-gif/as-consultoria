import { useReveal } from '../hooks/useReveal'

const LEVELS = [
  {
    price: 'USD 29',
    text: 'Necesito saber qué estoy haciendo mal.',
    href: '#plan-diagnostico',
  },
  {
    price: 'USD 99',
    text: 'Necesito que me ayudes a ordenarlo.',
    href: '#plan-plan7',
  },
  {
    price: 'USD 150/mes',
    text: 'Necesito acompañamiento para sostenerlo.',
    href: '#plan-mensual',
  },
]

export default function PlansIntro() {
  const ref = useReveal()

  return (
    <section className="section plans-intro" aria-labelledby="plans-intro-title" ref={ref}>
      <div className="container reveal">
        <h2 id="plans-intro-title" className="section-title">
          Elegí cuánto acompañamiento necesitás hoy
        </h2>
        <div className="levels-grid">
          {LEVELS.map((level) => (
            <a key={level.price} href={level.href} className="level-card">
              <span className="level-price">{level.price}</span>
              <p>{level.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
