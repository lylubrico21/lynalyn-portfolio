import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from '@/components/slab'

/**
 * WorkflowSamples
 *
 * A horizontally scrolling marquee of project screenshots. The strip loops
 * seamlessly; clicking any frame opens the full image in a faux macOS window
 * over the page. Pass your own `samples` / `caption` / `basePath` to reuse it
 * for a different project; omit them for the Christmas Elves defaults.
 *
 * Marquee: the list is duplicated so the CSS keyframe can translate -50% and
 * land the reset on a seamless seam. The track pauses on hover/focus so frames
 * are easy to click. The duplicate half is aria-hidden + removed from the tab
 * order so screen readers and keyboard users see each frame once.
 *
 * Modal: createPortal to body (escapes any transformed ancestor), Escape +
 * backdrop close, body scroll lock, focus moved into the dialog and returned to
 * the trigger on close - the same pattern as the other in-page previews.
 */

export type Sample = { file: string; label: string }

const DEFAULT_SAMPLES: Sample[] = [
  { file: 'ghl-assets.jpg', label: 'Zapier Assets' },
  { file: 'ghl-auto-tag-contact.jpg', label: 'Auto Tag New Contact' },
  { file: 'ghl-new-lead-intro.jpg', label: 'New Lead Residential Intro' },
  { file: 'ghl-estimate-sent.jpg', label: 'Estimate Sent Webhook' },
  { file: 'ghl-work-order-schedule.jpg', label: 'Work Order Schedule Webhook' },
  { file: 'ghl-job-complete.jpg', label: 'Job Complete Webhook' },
  { file: 'ghl-final-invoice-payment.jpg', label: 'Final Invoice + Final Payment Webhook' },
  { file: 'ghl-ce-workflows-list.jpg', label: 'Christmas Elves Restructure, Full Workflow List' },
  { file: 'ghl-home-workflows-list.jpg', label: 'Home Workflows: Quick Wins & Ad Conversions' },
  { file: 'ghl-funnels-list.jpg', label: 'Funnels: Installations, Reviews & Quotes' },
  { file: 'ghl-opportunities-pipeline.jpg', label: 'Sales Pipeline: 219 Opportunities' },
]

const DEFAULT_CAPTION = 'Christmas Elves (lighting company): lead to booked appointment, plus employee hiring and training.'

type Props = {
  samples?: Sample[]
  caption?: string
  /** Where the sample files live, e.g. '/placeholders/' or '/apps/delegatesuite/'. */
  basePath?: string
  /** Unique id for the caption heading, so two strips on one page don't clash. */
  id?: string
}

export default function WorkflowSamples({
  samples = DEFAULT_SAMPLES,
  caption = DEFAULT_CAPTION,
  basePath = '/placeholders/',
  id = 'workflow-samples',
}: Props) {
  const srcOf = useCallback((s: Sample) => `${basePath}${encodeURIComponent(s.file)}`, [basePath])
  const doubled = useMemo(() => [...samples, ...samples], [samples])

  const [active, setActive] = useState<Sample | null>(null)
  const lastTriggerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const open = useCallback((s: Sample, trigger: HTMLElement | null) => {
    lastTriggerRef.current = trigger ?? (document.activeElement as HTMLElement | null)
    setActive(s)
  }, [])

  const close = useCallback(() => {
    setActive(null)
    requestAnimationFrame(() => lastTriggerRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  return (
    <section className="wfs" id={id} aria-labelledby={`${id}-heading`} data-reveal>
      <p className="wfs__caption" id={`${id}-heading`}>
        {caption}
      </p>

      <div className="wfs__strip">
        <div className="wfs__track">
          {doubled.map((s, i) => {
            const clone = i >= samples.length
            return (
              <button
                key={`${s.file}-${i}`}
                type="button"
                className="wfs__frame"
                onClick={(e) => open(s, e.currentTarget)}
                aria-hidden={clone || undefined}
                tabIndex={clone ? -1 : undefined}
                aria-label={clone ? undefined : `Open ${s.label} screenshot`}
              >
                <span className="wfs__frame-bar" aria-hidden="true">
                  <span className="wfs__dot wfs__dot--r" />
                  <span className="wfs__dot wfs__dot--y" />
                  <span className="wfs__dot wfs__dot--g" />
                </span>
                <img
                  className="wfs__img"
                  src={srcOf(s)}
                  alt={clone ? '' : `${s.label} screenshot`}
                  loading="lazy"
                  decoding="async"
                />
              </button>
            )
          })}
        </div>
      </div>

      {active &&
        createPortal(
          <div
            className="wfs__modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.label} screenshot`}
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <div className="wfs__window">
              <div className="wfs__bar">
                <span className="wfs__bar-dots" aria-hidden="true">
                  <span className="wfs__dot wfs__dot--r" />
                  <span className="wfs__dot wfs__dot--y" />
                  <span className="wfs__dot wfs__dot--g" />
                </span>
                <span className="wfs__bar-title">{active.label}</span>
                <button
                  ref={closeRef}
                  type="button"
                  className="wfs__close"
                  onClick={close}
                  aria-label="Close image"
                >
                  <X weight="bold" size={18} aria-hidden="true" />
                </button>
              </div>
              <div className="wfs__imgwrap">
                <img className="wfs__full" src={srcOf(active)} alt={`${active.label} screenshot`} />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  )
}
