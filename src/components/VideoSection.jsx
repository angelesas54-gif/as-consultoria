import { useReveal } from '../hooks/useReveal'

const POINTS = [
  'Detectar dónde se te escapan oportunidades',
  'Ordenar tu seguimiento y prioridades',
  'Trabajar sobre tu negocio real',
]

const videoModules = import.meta.glob('../assets/video-presentacion.mp4', {
  eager: true,
  import: 'default',
})
const videoSrc = Object.values(videoModules)[0] || null

export default function VideoSection() {
  const ref = useReveal()

  return (
    <section
      id="video"
      className="section video-section"
      aria-labelledby="video-title"
      ref={ref}
    >
      <div className="container video-layout reveal">
        <div className="video-copy">
          <h2 id="video-title" className="section-title">
            ¿Qué vamos a hacer juntos?
          </h2>
          <ul className="video-points">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className="video-note">
            No trabajamos con ejemplos ficticios. Trabajamos sobre tus clientes, tu cartera, tus
            seguimientos y tus oportunidades reales.
          </p>
        </div>

        <div className="video-frame-wrap">
          <div className="video-phone">
            {videoSrc ? (
              <video
                className="video-player"
                controls
                playsInline
                preload="metadata"
                aria-label="Video de presentación de AS Consultoría"
              >
                <source src={videoSrc} type="video/mp4" />
                Tu navegador no soporta video HTML5.
              </video>
            ) : (
              <div
                className="video-placeholder"
                role="img"
                aria-label="Video de presentación próximamente"
              >
                <p>Video de presentación</p>
                <span>
                  Colocá <code>video-presentacion.mp4</code> en <code>src/assets</code>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
