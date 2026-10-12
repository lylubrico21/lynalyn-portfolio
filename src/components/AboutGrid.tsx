import type { CSSProperties } from 'react'
import { ArrowUpRight, MapPin } from '@/components/slab'
import { profile } from '@/data/profile'

/**
 * AboutGrid - the About view as a fixed viewport.
 *
 * One glass sheet, two columns: who you are on the left, the illustration
 * on the right. Sized to the panel, so nothing here scrolls.
 *
 * The left column is a ladder, not a paragraph block: one display statement,
 * one line of context, then the four things you do - each carrying the marks
 * of the tools it is built with. The tools are the proof, so they are the
 * visual. Swap the marks below for your own (any square SVG/PNG in public/).
 */

const GHL = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const ZAPIER = { src: '/icons/zapier.png', name: 'Zapier' }
const MAKE = { src: '/icons/make.png', name: 'Make' }
const GWS = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const SLACK = { src: '/icons/slack.svg', name: 'Slack' }
const MONDAY = { src: '/icons/monday.jpg', name: 'Monday.com' }
const ASANA = { src: '/icons/asana.svg', name: 'Asana' }
const CLICKUP = { src: '/icons/clickup.svg', name: 'ClickUp' }
const CLAUDE = { src: '/icons/ai/claude-color.svg', name: 'Claude' }
const CHATGPT = { src: '/icons/openai.svg', name: 'ChatGPT' }
const GITHUB = { src: '/icons/ai/github.svg', name: 'GitHub' }
const CLOUDFLARE = { src: '/icons/ai/cloudflare.svg', name: 'Cloudflare' }
const VERCEL = { src: '/icons/ai/vercel.svg', name: 'Vercel' }

type Capability = {
  index: string
  title: string
  marks: { src: string; name: string }[]
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Fractional COO',
    marks: [GWS, MONDAY, CLICKUP, SLACK],
  },
  {
    index: '02',
    title: 'GHL Systems Architect',
    marks: [GHL, ZAPIER, MAKE],
  },
  {
    index: '03',
    title: 'AI Automation & Systems Builder',
    marks: [CLAUDE, CHATGPT, GITHUB, CLOUDFLARE, VERCEL],
  },
  {
    index: '04',
    title: 'EOS Practitioner',
    marks: [MONDAY, ASANA, CLICKUP],
  },
]

export default function AboutGrid() {
  return (
    <section className="pgrid agrid" aria-labelledby="about-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">About</span>
        <h1 className="pgrid__title" id="about-title">
          {`Hi, I’m ${profile.firstName}, better known as Lyann.`}
        </h1>
        <p className="pgrid__lede">
          Operations and systems for business owners who are done being the bottleneck.
        </p>
      </header>

      <div className="home__glass agrid__glass">
        <div className="agrid__copy">
          <p className="agrid__lead">
            I spent years building businesses that couldn&apos;t run without me.
            <span> So I learned how to build the ones that could.</span>
          </p>

          <p className="agrid__note">
            <strong>Operations &amp; Systems Consulting</strong>, and{' '}
            <a className="agrid__link" href="/showcase">
              Lyly AI
            </a>
            . I help clinic owners, healthcare practices, and agencies build the operations backbone that runs without the founder in the middle. Fifteen years across 3 countries, from traditional operations to digital agencies, and an aspiring AI engineer building Lyly AI along the way.
          </p>

          <ul className="agrid__caps" role="list">
            {CAPABILITIES.map((c) => (
              <li key={c.index} className="agrid__cap">
                <span className="agrid__cap-marks">
                  {c.marks.map((m, i) => (
                    <span
                      key={m.name}
                      className="agrid__mark"
                      style={{ '--i': c.marks.length - i } as CSSProperties}
                    >
                      <img src={m.src} alt={m.name} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
                <span className="agrid__cap-title">{c.title}</span>
                <span className="agrid__cap-index" aria-hidden="true">
                  {c.index}
                </span>
              </li>
            ))}
          </ul>

          {/* One plate, two cells sharing a mark / title / meta anatomy. */}
          <div className="agrid__bar">
            <span className="agrid__cell">
              <span className="agrid__cell-mark agrid__cell-mark--img">
                <img src="/icons/cssc-badge.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Lean Six Sigma Black Belt</span>
                <span className="agrid__cell-meta">Certified</span>
              </span>
            </span>

            <span className="agrid__cell">
              <span className="agrid__cell-mark">
                <MapPin size={16} weight="fill" aria-hidden="true" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">{profile.location}</span>
                <span className="agrid__cell-meta">GMT+8 &middot; Philippine Standard Time</span>
              </span>
            </span>

            <a className="agrid__cell" href="#">
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/icons/tfmt-logo.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">The Freelance Movement Tribe</span>
                <span className="agrid__cell-meta">Member &amp; Public Speaker</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>

            <a className="agrid__cell" href="#">
              <span className="agrid__cell-mark agrid__cell-mark--plain">
                <img src="/icons/pbc-dubai-logo.png" alt="" loading="lazy" decoding="async" />
              </span>
              <span className="agrid__cell-copy">
                <span className="agrid__cell-title">Philippine Business Council Dubai, UAE</span>
                <span className="agrid__cell-meta">Member</span>
              </span>
              <ArrowUpRight className="agrid__cell-go" size={15} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="agrid__portrait">
          <img
            src="/tribex-portrait.jpg"
            alt="Lynalyn speaking on stage at Tribe X 2023"
            loading="eager"
            decoding="async"
            width={764}
            height={1400}
          />
        </div>
      </div>
    </section>
  )
}
