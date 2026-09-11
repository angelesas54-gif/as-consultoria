import heroImage from '../assets/angeles-consultoria.jpeg'
import { useReveal } from '../hooks/useReveal'

export default function About() {
  const ref = useReveal()

  return (
    <section id="sobre-mi" className="section about" aria-labelledby="about-title" ref={ref}>
      <div className="container about-layout reveal">
        <div className="about-media">
          <img
            src={heroImage}
            alt="Ángeles Sala, Técnica Universitaria en Negociación de Bienes"
            loading="lazy"
            width="640"
            height="800"
          />
        </div>
        <div className="about-copy">
          <h2 id="about-title" className="section-title">
            Quién está detrás de AS Consultoría
          </h2>
          <p className="about-subtitle">No llegué a esto desde afuera del rubro.</p>
          <p>
            Soy Ángeles Sala, Técnica Universitaria en Negociación de Bienes por la UTN y hace 7
            años trabajo en el rubro inmobiliario.
          </p>
          <p>
            Durante estos años trabajé con compradores, vendedores, captaciones, seguimientos y
            operaciones reales.
          </p>
          <p>
            AS Consultoría nace para ayudar a otros agentes a ordenar su negocio desde la
            experiencia práctica, no desde la teoría.
          </p>
          <p className="about-advance">
            También soy creadora de Agente Advance, una herramienta desarrollada específicamente
            para agentes inmobiliarios.
          </p>
        </div>
      </div>
    </section>
  )
}
