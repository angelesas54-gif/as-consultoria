import { useEffect, useState } from 'react'
import logo from '../assets/logo-as.png'

const NAV_LINKS = [
  { href: '#como-trabajo', label: 'Cómo trabajo' },
  { href: '#planes', label: 'Planes' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#faq', label: 'Preguntas frecuentes' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#inicio" className="brand" onClick={closeMenu} aria-label="AS Consultoría — inicio">
          <img src={logo} alt="AS Consultoría" className="brand-logo" width="140" height="40" />
        </a>

        <nav className="nav-desktop" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#planes" className="btn btn-sm btn-primary header-cta">
          Ver planes
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Menú móvil">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#planes" className="btn btn-primary" onClick={closeMenu}>
            Ver planes
          </a>
        </nav>
      </div>
    </header>
  )
}
