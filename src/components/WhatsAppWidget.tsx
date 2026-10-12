import { useCallback, useRef, useState } from 'react'
import { WhatsappLogo, X, ArrowUpRight } from '@/components/slab'
import { profile } from '@/data/profile'
import { useDismiss, type DismissReason } from '@/hooks/useDismiss'

/**
 * WhatsAppWidget - fixed bottom-right, the mirror of AccessMenu (a11y.css).
 * One button opens a small greeting panel with a single way out: a link to
 * a WhatsApp chat, pre-filled with an opening message. No backend, no AI,
 * just a direct line.
 */
const GREETING = "Hi, I'm Lynalyn. Got a question about your systems or need a hand with something? Message me directly and I'll reply myself."
const PREFILL = "Hi Lyann, I found your portfolio and wanted to ask about..."

const WHATSAPP_HREF = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(PREFILL)}`

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const close = useCallback((reason: DismissReason | 'button') => {
    setOpen(false)
    if (reason !== 'outside') buttonRef.current?.focus()
  }, [])
  useDismiss(open, rootRef, close)

  return (
    <div className={`wa${open ? ' is-open' : ''}`} data-widget="whatsapp" ref={rootRef}>
      <div
        className="wa__panel"
        role="dialog"
        aria-label="Message on WhatsApp"
        tabIndex={-1}
        ref={panelRef}
        inert={!open || undefined}
      >
        <header className="wa__head">
          <span className="wa__title">Let's talk.</span>
          <button
            type="button"
            className="wa__close"
            onClick={() => close('button')}
            aria-label="Close chat panel"
          >
            <X size={16} weight="bold" aria-hidden="true" />
          </button>
        </header>
        <p className="wa__body">{GREETING}</p>
        <a
          className="wa__cta"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappLogo size={18} weight="fill" aria-hidden="true" />
          <span>Chat on WhatsApp</span>
          <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </a>
      </div>

      <button
        type="button"
        className="wa__button"
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Message on WhatsApp"
        title="Message on WhatsApp"
      >
        <WhatsappLogo size={24} weight="fill" aria-hidden="true" />
      </button>
    </div>
  )
}
