import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { EBOOK, getWhatsAppUrl } from '../config/siteConfig'
import logo from '../assets/logo-as.png'

export default function AccesoEbook() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [token, setToken] = useState(() => searchParams.get('token') || '')
  const [status, setStatus] = useState('checking')
  const [error, setError] = useState(null)

  const paymentId =
    searchParams.get('payment_id') ||
    searchParams.get('collection_id') ||
    searchParams.get('paymentId')

  const acompanamientoWhatsApp = getWhatsAppUrl(
    'Hola Ángeles, quiero acompañamiento personalizado.',
  )

  useEffect(() => {
    let cancelled = false

    async function resolveAccess() {
      if (token) {
        try {
          const response = await fetch(`/api/ebook/claim?token=${encodeURIComponent(token)}`)
          const data = await response.json().catch(() => ({}))
          if (!response.ok) {
            throw new Error(data.error || 'Token inválido')
          }
          if (!cancelled) setStatus('ready')
        } catch (err) {
          if (!cancelled) {
            setStatus('error')
            setError(err.message)
          }
        }
        return
      }

      if (!paymentId) {
        if (!cancelled) {
          setStatus('error')
          setError(
            'No encontramos un acceso válido. Si pagaste por transferencia, Ángeles te enviará el enlace cuando confirme el pago. Si pagaste con Mercado Pago, revisá el email de respaldo.',
          )
        }
        return
      }

      try {
        const response = await fetch('/api/ebook/claim', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payment_id: paymentId }),
        })
        const data = await response.json().catch(() => ({}))
        if (!response.ok || !data.token) {
          throw new Error(data.error || 'No se pudo validar el pago')
        }
        if (cancelled) return

        setToken(data.token)
        setSearchParams({ token: data.token }, { replace: true })
        setStatus('ready')
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
          setError(err.message)
        }
      }
    }

    resolveAccess()
    return () => {
      cancelled = true
    }
  }, [token, paymentId, setSearchParams])

  const pdfHref = token ? `/api/ebook/pdf?token=${encodeURIComponent(token)}` : null
  const bonusPdfHref = token
    ? `/api/ebook/bonus-pdf?token=${encodeURIComponent(token)}`
    : null

  return (
    <div className="access-page">
      <header className="access-header">
        <div className="container access-header-inner">
          <Link to="/#inicio" className="brand" aria-label="AS Consultoría — inicio">
            <img src={logo} alt="AS Consultoría" className="brand-logo" width="140" height="40" />
          </Link>
          <Link to="/#ebook" className="btn btn-sm btn-ghost">
            Volver al ebook
          </Link>
        </div>
      </header>

      <main className="container access-main">
        <p className="eyebrow">Acceso al material</p>
        <h1>{EBOOK.name}</h1>

        {status === 'checking' ? <p className="access-status">Validando tu acceso…</p> : null}

        {status === 'error' ? (
          <div className="access-error" role="alert">
            <p>{error}</p>
            <Link to="/#ebook" className="btn btn-primary">
              Ir a la sección del ebook
            </Link>
          </div>
        ) : null}

        {status === 'ready' ? (
          <div className="access-simple">
            <p className="access-note">
              Los videos prácticos están incluidos dentro del ebook mediante enlaces clickeables.
            </p>

            <div className="access-downloads">
              <p className="access-downloads-title">Tus archivos</p>
              <ol className="access-downloads-list">
                <li>{EBOOK.name}</li>
                <li>{EBOOK.bonusName}</li>
              </ol>
            </div>

            <div className="access-actions">
              {pdfHref ? (
                <a className="btn btn-primary btn-lg btn-block" href={pdfHref}>
                  1. Descargar ebook
                </a>
              ) : null}
              {bonusPdfHref ? (
                <a className="btn btn-primary btn-lg btn-block" href={bonusPdfHref}>
                  2. Descargar guía bonus
                </a>
              ) : null}
              <a
                className="btn btn-outline btn-lg btn-block"
                href={EBOOK.agenteAdvanceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Agente Advance
              </a>
              <a
                className="btn btn-ghost btn-lg btn-block"
                href={acompanamientoWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero acompañamiento personalizado
              </a>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
