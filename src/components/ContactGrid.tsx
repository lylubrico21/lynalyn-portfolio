import { useState } from 'react'
import { ArrowUpRight, CaretDown } from '@/components/slab'
import { FAQS } from '@/data/faqs'
import { profile } from '@/data/profile'

/**
 * ContactGrid - the Contact view as a fixed viewport.
 *
 * One glass sheet, two columns: the questions people ask before they write
 * on the left, on a dark plate (one open at a time, the list scrolls), and
 * a direct-contact CTA on the right - real channels, not a form. Sized to
 * the panel, so nothing here scrolls.
 *
 * This used to be a form posting through lib/contact.ts. Replaced with a
 * direct channel list: no backend to wire, no visitor depending on their
 * own email client actually sending - just real, working links.
 */

/** Last path segment of a profile URL, for a clean handle instead of the
 *  full link - lynalynlubrico.com/in/lynalynlubrico/ -> lynalynlubrico. */
const handleOf = (href: string) => href.replace(/\/$/, '').split('/').pop() ?? href

const WHATSAPP_HREF = `https://wa.me/${profile.whatsapp}`

type Channel = { label: string; value: string; href: string }

const CHANNELS: Channel[] = [
  { label: 'WhatsApp', value: '+63 977 646 6158', href: WHATSAPP_HREF },
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  ...profile.socials.map((s) => ({
    label: s.label.replace(' profile', ''),
    value: `@${handleOf(s.href)}`,
    href: s.href,
  })),
]

export default function ContactGrid() {
  // One question open at a time so the plate never grows past the panel.
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section className="pgrid cgrid" aria-labelledby="contact-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">FAQs / Contact</span>
        <h1 className="pgrid__title" id="contact-title">
          Tell me what&apos;s slowing you down.
        </h1>
        <p className="pgrid__lede">
          Tell me what&apos;s eating your week. If I can build a system for it, you&apos;ll get a plan back. If I can&apos;t, I&apos;ll tell you that too.
        </p>
      </header>

      <div className="home__glass cgrid__glass">
        {/* Left: the dark plate. What happens after you press send. */}
        <aside className="cgrid__aside" aria-labelledby="contact-faq">
          <div className="cgrid__aside-head">
            <span className="cgrid__eyebrow">FAQs</span>
            <h2 className="cgrid__aside-title" id="contact-faq">
              Quick answers.
              <br />
              <span>Still have one? Write below.</span>
            </h2>
          </div>

          <ul className="cgrid__faqs" role="list">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i
              return (
                <li key={f.q} className={`cgrid__faq${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="cgrid__faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`cfaq-${i}`}
                  >
                    <span className="cgrid__step-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="cgrid__faq-text">{f.q}</span>
                    <CaretDown size={14} weight="bold" className="cgrid__faq-caret" aria-hidden="true" />
                  </button>
                  <div className="cgrid__faq-a" id={`cfaq-${i}`} hidden={!isOpen}>
                    <p>{f.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </aside>

        {/* Right: skip the form, message me directly. */}
        <div className="cgrid__panel">
          <div className="cgrid__direct-head">
            <span className="cgrid__eyebrow">Contact</span>
            <h2 className="cgrid__direct-title">Message me directly.</h2>
            <p className="cgrid__direct-lede">Whichever you check first. I reply within one business day.</p>
          </div>

          <ul className="cgrid__channels" role="list">
            {CHANNELS.map((c) => (
              <li key={c.label} className="cgrid__channel">
                <span className="cgrid__channel-label">{c.label}</span>
                <a
                  className="cgrid__channel-value"
                  href={c.href}
                  target={c.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                >
                  {c.value}
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <p className="cgrid__channel-note">One business day. No newsletter, no drip.</p>
        </div>
      </div>
    </section>
  )
}
