import logo from '../assets/logo-as.png'
import {
  AGENTE_ADVANCE_URL,
  getWhatsAppUrl,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
} from '../config/siteConfig'

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl('Hola Ángeles, te escribo desde la web de AS Consultoría.')

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="AS Consultoría" className="brand-logo" width="130" height="38" />
          <p className="footer-name">Ángeles Sala</p>
          <p className="footer-role">
            Técnica Universitaria en Negociación de Bienes – UTN
          </p>
        </div>

        <nav className="footer-links" aria-label="Enlaces del pie">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <a href={AGENTE_ADVANCE_URL} target="_blank" rel="noopener noreferrer">
            Agente Advance
          </a>
        </nav>

        <p className="footer-copy">
          © {new Date().getFullYear()} AS Consultoría. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
