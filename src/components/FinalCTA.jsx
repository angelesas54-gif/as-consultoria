import { useReveal } from '../hooks/useReveal'

export default function FinalCTA() {
  const ref = useReveal()

  return (
    <section className="section final-cta" aria-labelledby="final-cta-title" ref={ref}>
      <div className="container narrow reveal">
        <h2 id="final-cta-title" className="section-title">
          Tu problema no siempre es conseguir más clientes. A veces es ordenar los que ya tenés.
        </h2>
        <p className="section-lead">
          Elegí el nivel de acompañamiento que necesitás hoy y empezá a trabajar con más claridad.
        </p>
        <a href="#planes" className="btn btn-primary btn-lg">
          Ver planes
        </a>
      </div>
    </section>
  )
}
