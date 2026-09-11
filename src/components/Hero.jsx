import heroImage from '../assets/angeles-consultoria.jpeg'
import { useReveal } from '../hooks/useReveal'

export default function Hero() {
  const ref = useReveal()

  return (
    <section id="inicio" className="hero" ref={ref}>
      <div className="hero-media" aria-hidden="false">
        <img
          src={heroImage}
          alt="Ángeles Sala, consultora de AS Consultoría"
          className="hero-image"
          width="900"
          height="1200"
          fetchPriority="high"
        />
        <div className="hero-media-overlay" aria-hidden="true" />
      </div>

      <div className="container hero-content reveal">
        <p className="eyebrow">AS Consultoría</p>
        <h1>Ordená tu negocio inmobiliario y dejá de trabajar apagando incendios</h1>
        <p className="lead">
          Consultoría práctica para agentes inmobiliarios que necesitan ordenar clientes,
          seguimiento, cartera y rutina comercial.
        </p>
        <p className="hero-brief">
          Te ayudo a detectar dónde se te están escapando oportunidades y a ordenar tu negocio
          con un sistema simple y aplicable.
        </p>
        <div className="hero-actions">
          <a href="#planes" className="btn btn-primary btn-lg">
            Ver planes
          </a>
          <a href="#como-trabajo" className="btn btn-ghost btn-lg">
            Conocé cómo trabajo
          </a>
        </div>
        <p className="hero-note">Diagnóstico desde USD 29</p>
      </div>
    </section>
  )
}
