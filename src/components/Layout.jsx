import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'

export default function Layout({ children, className = '' }) {
  return (
    <div className={`site-shell ${className}`.trim()}>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
