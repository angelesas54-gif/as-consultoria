import { getWhatsAppUrl } from '../config/siteConfig'

export default function WhatsAppFloat() {
  const url = getWhatsAppUrl(
    'Hola Ángeles, tengo una duda puntual sobre la consultoría.',
  )

  return (
    <a
      href={url}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <span className="whatsapp-float-text">¿Tenés una duda puntual? Escribime.</span>
      <span className="whatsapp-float-icon" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28" focusable="false">
          <path
            fill="currentColor"
            d="M19.11 17.47c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.57.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32z"
          />
          <path
            fill="currentColor"
            d="M16.02 3C9.4 3 4.03 8.37 4.03 15c0 2.12.56 4.18 1.62 6L4 29l8.2-1.62A11.94 11.94 0 0 0 16.02 27C22.64 27 28 21.63 28 15S22.64 3 16.02 3zm0 21.87c-1.88 0-3.72-.5-5.33-1.45l-.38-.23-4.87.96 1-4.75-.25-.4A9.86 9.86 0 0 1 6.15 15c0-5.44 4.43-9.87 9.87-9.87S25.9 9.56 25.9 15s-4.44 9.87-9.88 9.87z"
          />
        </svg>
      </span>
    </a>
  )
}
