import { useEffect, useId, useRef, useState } from 'react'
import { GALICIA, getWhatsAppUrl } from '../config/siteConfig'

export default function TransferModal({ plan, onClose }) {
  const titleId = useId()
  const dialogRef = useRef(null)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    if (!plan) return undefined

    const previousFocus = document.activeElement
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previousFocus?.focus?.()
    }
  }, [plan, onClose])

  if (!plan) return null

  const copyValue = async (key, value) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      setCopied(null)
    }
  }

  const whatsappUrl = getWhatsAppUrl(plan.whatsappTransferMessage)

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <p className="modal-eyebrow">Transferencia en USD</p>
        <h2 id={titleId}>{plan.name}</h2>
        <p className="modal-amount">{plan.priceLabel}</p>

        <dl className="bank-details">
          <div>
            <dt>Titular</dt>
            <dd>{GALICIA.titular}</dd>
          </div>
          <div>
            <dt>Alias</dt>
            <dd>
              <span>{GALICIA.alias}</span>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => copyValue('alias', GALICIA.alias)}
              >
                {copied === 'alias' ? 'Copiado' : 'Copiar alias'}
              </button>
            </dd>
          </div>
          <div>
            <dt>CBU</dt>
            <dd>
              <span className="cbu">{GALICIA.cbu}</span>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => copyValue('cbu', GALICIA.cbu)}
              >
                {copied === 'cbu' ? 'Copiado' : 'Copiar CBU'}
              </button>
            </dd>
          </div>
        </dl>

        <a
          href={whatsappUrl}
          className="btn btn-primary btn-block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ya transferí
        </a>
        <p className="modal-hint">
          Al tocar “Ya transferí” se abre WhatsApp para enviarle el comprobante a Ángeles.
        </p>
      </div>
    </div>
  )
}
