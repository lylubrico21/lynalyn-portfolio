import type { CSSProperties } from 'react'
import { MagnifyingGlass, PencilSimple, Lightning, UsersThree, CheckCircle } from '@/components/slab'
import type { Icon } from '@/components/slab'
import Autopilot, { TOOLS } from '@/components/Autopilot'

/**
 * ServicesGrid - the Services view on one glass sheet.
 *
 * Three bands, top to bottom: your three-step method (on a dark plate so it
 * is the first thing the eye lands on), the five services as cards that carry
 * the marks of what each one is built with, and the live automation demo
 * scaled into whatever height is left. Same object language as Home and
 * Projects: the glass, the bento card, plated marks, orange for the index
 * and the accent.
 *
 * Every string below is a PLACEHOLDER. Replace it, or hand this file to your
 * AI assistant and tell it what to put in each spot.
 */

/* ---------- The method ---------- */

type Stage = {
  index: string
  label: string
  body: string
  Icon: Icon
  chips: string[]
}

const STAGES: Stage[] = [
  {
    index: '01',
    label: 'Diagnose',
    body: 'Map exactly how the business runs today: every process, tool, and place where work slows down.',
    Icon: MagnifyingGlass,
    chips: ['Business mapping', 'Process audit', 'Leak diagnosis'],
  },
  {
    index: '02',
    label: 'Design',
    body: 'Design the operating system: every SOP, workflow, and automation built around how the business actually works.',
    Icon: PencilSimple,
    chips: ['Operating system blueprint', 'SOP design', 'Automation plan'],
  },
  {
    index: '03',
    label: 'Deploy',
    body: 'Configure everything live and train the team. A running system, not a folder of documents to figure out alone.',
    Icon: Lightning,
    chips: ['Live configuration', 'Team training', 'System handoff'],
  },
  {
    index: '04',
    label: 'Delegate',
    body: 'The team keeps everything running every month. One check-in, and the business moves forward without you holding it together.',
    Icon: UsersThree,
    chips: ['Embedded ops support', 'Monthly check-ins', 'Hands-off ops'],
  },
]

/* ---------- The services ---------- */

const GHL = '/icons/gohighlevel.png'
const GOOGLE_SHEETS = '/icons/googlesheets.svg'
const CLICKUP = '/icons/clickup.svg'
const MONDAY = '/icons/monday.jpg'
const ZAPIER = '/icons/zapier.png'
const MAKE = '/icons/make.png'
const GOOGLE_WORKSPACE = '/icons/googleworkspace.svg'
const MICROSOFT = '/icons/microsoft.png'
const ASANA = '/icons/asana.svg'

type Service = {
  index: string
  title: string
  description: string
  chip: string
  logos: string[]
  bullets: string[]
}

const SERVICES: Service[] = [
  {
    index: '01',
    title: 'Systems Clarity Audit',
    description: 'A full map of how the business runs today, and exactly what to fix first.',
    chip: 'A clear map',
    logos: [GHL, GOOGLE_SHEETS, CLICKUP],
    bullets: [
      'Leads, sales, delivery, team and numbers, mapped end to end',
      'Where time, money and leads are leaking, named specifically',
      'A prioritized list of what to fix first',
    ],
  },
  {
    index: '02',
    title: 'Fractional Operations Partner',
    description: 'The dashboard, reporting and automation that let you stop running ops yourself.',
    chip: 'Hands-off ops',
    logos: [GHL, GOOGLE_SHEETS, MONDAY],
    bullets: [
      'A KPI dashboard and client fulfillment reporting',
      'Client and staff onboarding and offboarding, automated',
      'A Business Playbook that holds every SOP in one place',
    ],
  },
  {
    index: '03',
    title: 'CRM & Automation Build',
    description: 'A done-for-you CRM and automation system, from first enquiry to signed client.',
    chip: 'Leads on autopilot',
    logos: [GHL, ZAPIER, MAKE],
    bullets: [
      'A CRM built around how leads actually move through the business',
      'Lead-to-job automation: follow-up, reminders, scheduling, invoicing',
      'Chatbot and form qualification so no lead sits unanswered',
    ],
  },
  {
    index: '04',
    title: 'Business Playbook & SOPs',
    description: "Every SOP in one place, owned by name, so the team doesn't wait on you.",
    chip: 'Documented, not tribal',
    logos: [GOOGLE_SHEETS, GOOGLE_WORKSPACE, MICROSOFT],
    bullets: [
      'A master procedures list, weighted by priority',
      'Roles and responsibilities, written down and assigned',
      'A weekly meeting rhythm that keeps it alive',
    ],
  },
  {
    index: '05',
    title: 'AI Tools & Custom Builds',
    description: 'Custom AI tools, like Lyly AI, built around how your business actually runs.',
    chip: 'Your own AI COO',
    logos: [GHL, ZAPIER, ASANA],
    bullets: [
      'A custom AI tool trained on your own playbook, not a generic prompt',
      'Built and shipped as a real, usable web app',
      'CRM and AI handling the repetitive work automatically',
    ],
  },
]

/** The tool marks, stacked horizontally on white tiles (same as Projects). */
function Marks({ logos }: { logos: string[] }) {
  return (
    <span className="bento__logos" aria-hidden="true">
      {logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- The page ---------- */

export default function ServicesGrid() {
  return (
    <section className="pgrid sgrid" aria-labelledby="services-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Services</span>
        <h1 className="pgrid__title" id="services-title">
          Everything you offer, in one line each.
        </h1>
        <p className="pgrid__lede">
          Five ways to work together, from a one-time audit to a fully built operating system. Stack what you need.
        </p>
      </header>

      <div className="home__glass sgrid__glass">
        {/* One dark plate, the headline on the left, the three stages wired
            in order on the right with a signal running them. */}
        <div className="sgrid__method" aria-labelledby="method-title">
          <div className="sgrid__method-copy">
            <span className="sgrid__method-eyebrow">Your Method</span>
            <h2 className="sgrid__method-title" id="method-title">
              Diagnose. Design. Deploy. Delegate.
              <br />
              <span>The four steps behind every system.</span>
            </h2>
            <p className="sgrid__method-sub">
              Four steps that take a business from depending on the founder to running on its own systems.
            </p>
          </div>

          <ol className="sgrid__stages" role="list">
            {STAGES.map((s, i) => {
              const StageIcon = s.Icon
              return (
                <li key={s.index} className="sgrid__stage" style={{ '--i': i } as CSSProperties}>
                  <span className="sgrid__stage-ghost" aria-hidden="true">{s.index}</span>
                  <span className="sgrid__stage-icon" aria-hidden="true">
                    <StageIcon size={22} weight="duotone" />
                  </span>
                  <h3 className="sgrid__stage-label">{s.label}.</h3>
                  <p className="sgrid__stage-body">{s.body}</p>
                  <ul className="sgrid__stage-chips" role="list" aria-label={`${s.label} touches`}>
                    {s.chips.map((c) => (
                      <li key={c} className="sgrid__stage-chip">{c}</li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Five cards, each carrying the marks of what it is built with. */}
        <div className="sgrid__offers">
          <div className="sgrid__offers-head">
            <h2 className="sgrid__offers-title">Pick one, or stack a few.</h2>
            <p className="sgrid__offers-sub">Each one stands alone, or stack them for the full operating system.</p>
          </div>
          <ul className="bento sgrid__services" role="list">
            {SERVICES.map((s) => (
              <li key={s.title} className="bento__card sgrid__service">
                <span className="bento__head">
                  <span className="sgrid__service-top">
                    <Marks logos={s.logos} />
                    <span className="sgrid__service-index" aria-hidden="true">{s.index} / 05</span>
                  </span>
                  <span className="bento__title">{s.title}</span>
                  <span className="bento__desc">{s.description}</span>
                </span>
                <span className="sgrid__chip" aria-hidden="true">{s.chip}</span>
                <ul className="sgrid__bullets" role="list">
                  {s.bullets.map((b) => (
                    <li key={b} className="sgrid__bullet">
                      <CheckCircle size={15} weight="duotone" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/* The live workflow. Its caption and the tool chips sit in a header
            above the window, so the canvas gets the whole glass width. */}
        <div className="sgrid__flow">
          <header className="sgrid__flow-head">
            <div className="sgrid__flow-copy">
              <span className="sgrid__flow-eyebrow">Live automation</span>
              <h2 className="sgrid__flow-title">A lead, chased until it's won.</h2>
              <p className="sgrid__flow-sub">
                From a form submission to a signed client: the CRM updates itself, reminders go out on schedule, and nothing waits on a human to follow up.
              </p>
            </div>
            <ul className="sgrid__flow-tools" role="list" aria-label="Tools that power this flow">
              {TOOLS.map(({ Icon: ToolIcon, label }) => (
                <li key={label} className="sgrid__flow-tool">
                  <ToolIcon size={14} weight="duotone" aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </header>
          <div className="sgrid__flow-main">
            <Autopilot compact maxScale={1.08} />
          </div>
        </div>
      </div>
    </section>
  )
}
