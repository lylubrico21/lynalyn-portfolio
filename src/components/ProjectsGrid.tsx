import { Fragment, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, Hospital, Buildings, Storefront, CursorClick, Kanban } from '@/components/slab'
import { FlowIcon, PlanIcon, GlobeIcon, SparkIcon, DeviceIcon } from './ProjectIcons'
import { AutomationsPanel, OpsPanel, PlanPanel, TicketingPanel, FrameworkPanel, WorkflowPanel, BarrelPanel, AIWindow, AppsWindow } from './ProjectPanels'
import { gymFunnel, bookingFunnel, websiteFunnel, type Funnel } from '@/data/funnels'
import { mobileApps } from '@/data/projects'
import { aiStack, type StackNode } from '@/data/ai-stack'
import { useIsPhone } from '@/hooks/useMediaQuery'

/**
 * Projects, as one viewport in Home's bento language: a glass panel of six
 * cards, each previewing its own body of work with a live inner track, each
 * opening the work itself in a near-fullscreen dialog (see ProjectPanels for
 * the first three; the rest are the sections the long page used to stack).
 *
 * The dialog is a portal at z 8000, under the funnel preview (9000) so the
 * barrel's own "open this page" dialog can still stack on top of it.
 */
type Project = {
  id: string
  index: string
  title: string
  desc: string
  Icon: ComponentType<{ size?: number }>
  eyebrow: string
  Section: ComponentType
  span?: 2 | 4
  /** Open Builds style: a small orange kicker above the title. */
  kicker?: string
  /** Real marks of what the work was built in; replaces the icon tile. */
  logos?: string[]
  Preview: ComponentType
  /** Phone filter bucket. */
  cat: Cat
}

type Cat = 'work' | 'sites' | 'apps' | 'ai'
const FILTERS: { key: Cat | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'work', label: 'Work' },
  { key: 'sites', label: 'Sites' },
  { key: 'apps', label: 'Apps' },
  { key: 'ai', label: 'AI' },
]

/** Example tool marks, from public/icons. Swap for what you build with. */
const GHL = '/icons/gohighlevel.png'
const ZAPIER = '/icons/zapier.png'
const ASANA = '/icons/asana.svg'
const MONDAY = '/icons/monday.jpg'

const WF_SHOTS = [
  'ghl-assets.jpg',
  'ghl-auto-tag-contact.jpg',
  'ghl-new-lead-intro.jpg',
  'ghl-estimate-sent.jpg',
  'ghl-work-order-schedule.jpg',
  'ghl-job-complete.jpg',
  'ghl-final-invoice-payment.jpg',
  'ghl-ce-workflows-list.jpg',
  'ghl-home-workflows-list.jpg',
  'ghl-funnels-list.jpg',
  'ghl-opportunities-pipeline.jpg',
].map((f) => `/placeholders/${f}`)

const OPS_SHOTS = [
  { file: 'monday-client-starter.jpg', label: 'Client Starter Pipeline' },
  { file: 'monday-websites-board.jpg', label: 'Website Build Workflow' },
  { file: 'monday-creative-requests.jpg', label: 'Creative Request Desk' },
  { file: 'monday-team-dashboard.jpg', label: 'Team Progress Dashboard' },
]

const FUNNEL_SHOTS = [gymFunnel[0], bookingFunnel[0], websiteFunnel[0]].filter(Boolean)
const thumbSrc = (f: Funnel) => `/${f.dir ?? 'funnels'}/thumbs/${f.file.replace('.html', '.jpeg')}`

/** The three featured builds: each its own card in the stack, each its own
 *  pop-up. */
const BUILDS: Project[] = [
  { id: 'ticketing', cat: 'work', index: '03', kicker: 'Healthcare', title: 'Bernardino Private Hospital', desc: 'Registration and onboarding automated across 3 hospital branches, cutting a 1 to 3 day process to 20 to 30 minutes.', Icon: () => <Hospital size={20} weight="duotone" />, eyebrow: 'Featured build', Section: TicketingPanel, Preview: () => null },
  { id: 'framework', cat: 'work', index: '04', kicker: 'Real Estate', title: 'Freedom Hill Real Estate', desc: 'A one-agent bottleneck turned into a done-for-you CRM running about 180 qualified clients a month.', Icon: () => <Buildings size={20} weight="duotone" />, eyebrow: 'Featured build', Section: FrameworkPanel, Preview: () => null },
  { id: 'workflow', cat: 'work', index: '05', kicker: 'Franchise & Retail', title: 'Donut Park PH', desc: 'Warehouse, supply chain, ordering, and accounting systems built as COO, scaling the franchise from 54 to 220 branches in 11 months.', Icon: () => <Storefront size={20} weight="duotone" />, eyebrow: 'Featured build', Section: WorkflowPanel, Preview: () => null },
]

const leaves = (n: StackNode): StackNode[] => (n.children?.length ? n.children.flatMap(leaves) : [n])
const AI_LEAVES = leaves(aiStack)

/* ---------- Previews ---------- */

function WorkflowsPreview() {
  return (
    <div className="bento__media bento__reel" aria-hidden="true">
      <div className="bento__reel-track">
        {[...WF_SHOTS, ...WF_SHOTS].map((src, i) => (
          <span key={i} className="bento__shot">
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

function OpsPreview() {
  const shots = OPS_SHOTS.map((s) => `/placeholders/${s.file}`)
  return (
    <div className="bento__media bento__reel" aria-hidden="true">
      <div className="bento__reel-track">
        {[...shots, ...shots].map((src, i) => (
          <span key={i} className="bento__shot">
            <img src={src} alt="" loading="lazy" decoding="async" />
          </span>
        ))}
      </div>
    </div>
  )
}

/** A paper mock of the plan document, the way SamplePlan previews it. */
function PlanPreview() {
  return (
    <div className="bento__media bento__doc" aria-hidden="true">
      <span className="bento__doc-eyebrow">Case study</span>
      <span className="bento__doc-title">Practice Growth Partners</span>
      <span className="bento__doc-flow">
        <i>Booking</i>
        <i className="is-on">Playbook</i>
      </span>
    </div>
  )
}

/** The three builds as Open Builds rows: plate, eyebrow, title, arrow. */
function FunnelsPreview() {
  return (
    <div className="bento__media bento__fan" aria-hidden="true">
      {FUNNEL_SHOTS.map((f, i) => (
        <span key={f.file} className="bento__photo bento__photo--page" style={{ ['--i' as string]: i }}>
          <img src={thumbSrc(f)} alt="" loading="lazy" decoding="async" />
        </span>
      ))}
    </div>
  )
}

function AIPreview() {
  const half = Math.ceil(AI_LEAVES.length / 2)
  const rows = [AI_LEAVES.slice(0, half), AI_LEAVES.slice(half)]
  return (
    <div className="bento__media bento__chips" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className="bento__chip-row" data-dir={r ? 'right' : 'left'}>
          <div className="bento__chip-track">
            {[...row, ...row].map((n, i) => (
              <span key={`${n.id}-${i}`} className="bento__chip" data-status={n.status}>
                <n.Icon size={15} weight="duotone" />
                {n.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function AppsPreview() {
  return (
    <div className="bento__media bento__reel bento__reel--row" aria-hidden="true">
      <div className="bento__reel-track">
        {[...mobileApps, ...mobileApps].map((app, i) => (
          <span
            key={`${app.name}-${i}`}
            className="bento__shot bento__shot--app"
            style={{ ['--app-color' as string]: app.accentColor }}
          >
            {app.imageSrc ? (
              <img src={app.imageSrc} alt="" loading="lazy" decoding="async" />
            ) : (
              <span className="app-card__img-placeholder">
                <span className="app-card__img-initials">
                  {app.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

const PROJECTS: Project[] = [
  { id: 'workflows', cat: 'work', index: '01', title: 'HighLevel Automations', desc: 'Christmas Elves (lighting company): the full lead acquisition system, from first lead to booked appointment, plus employee hiring and training.', Icon: FlowIcon, logos: [GHL], eyebrow: 'Screenshots', Section: AutomationsPanel, span: 2, Preview: WorkflowsPreview },
  { id: 'plan', cat: 'work', index: '02', title: 'Agency Playbook', desc: 'Practice Growth Partners: the playbook that scaled a medical marketing agency from 48 to 250+ clinics.', Icon: PlanIcon, eyebrow: 'Case study', Section: PlanPanel, Preview: PlanPreview },
  { id: 'funnels', cat: 'sites', index: '06', title: 'Pages and sites', desc: 'Real client sites, from a donut franchise to a Dubai fashion school. Spin the reel to open one full size.', Icon: GlobeIcon, eyebrow: 'Pages and sites', Section: BarrelPanel, Preview: FunnelsPreview },
  { id: 'ai', cat: 'ai', index: '07', title: 'Systems I run for clients', desc: 'Healthcare, franchise retail, real estate, and education - a look at the automations running inside real businesses.', Icon: SparkIcon, logos: [GHL, ZAPIER, ASANA, MONDAY], eyebrow: 'Client systems', Section: AIWindow, Preview: AIPreview },
  { id: 'ops', cat: 'work', index: '08', title: 'Project & Ops Management', desc: 'Built from scratch migrating a client off Asana onto Monday.com: a per-department dashboard for client pipeline, sales, marketing, website, and design.', Icon: Kanban, logos: [MONDAY], eyebrow: 'Screenshots', Section: OpsPanel, span: 2, Preview: OpsPreview },
  { id: 'apps', cat: 'apps', index: '09', title: 'Apps and tools', desc: 'DelegateMate CRM, DelegateSuite, and Lyly AI: internal tools built solo to skip costly subscriptions.', Icon: DeviceIcon, eyebrow: 'Built for myself', Section: AppsWindow, span: 4, Preview: AppsPreview },
]

/** The icon tile, or the real marks stacked horizontally in its place. */
function Marks({ p, size = 22 }: { p: Project; size?: number }) {
  if (!p.logos?.length) {
    return (
      <span className="bento__icon">
        <p.Icon size={size} />
      </span>
    )
  }
  return (
    <span className="bento__logos" aria-hidden="true">
      {p.logos.map((src) => (
        <span key={src} className="bento__logo">
          <img src={src} alt="" width={22} height={22} decoding="async" />
        </span>
      ))}
    </span>
  )
}

/* ---------- Dialog ----------
   A backdrop, a close button in the corner, and the work. No panel, no
   header: each Section brings its own window (or, for the strip, none). */
function ProjectModal({ project, onClose, children }: { project: Project; onClose: () => void; children: ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return createPortal(
    <div
      className="pmodal"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <button ref={closeRef} type="button" className="pmodal__close" onClick={onClose} aria-label="Close">
        <X size={18} weight="bold" />
      </button>
      <div className="pmodal__stage">{children}</div>
    </div>,
    document.body,
  )
}

/* ---------- The page ---------- */

export default function ProjectsGrid() {
  const [open, setOpen] = useState<Project | null>(null)
  const phone = useIsPhone()
  const [cat, setCat] = useState<Cat | 'all'>('all')
  const keep = (p: Project) => !phone || cat === 'all' || p.cat === cat
  const projects = PROJECTS.filter(keep)
  const builds = BUILDS.filter(keep)
  const triggerRef = useRef<HTMLElement | null>(null)

  const show = useCallback((p: Project, el: HTMLElement) => {
    triggerRef.current = el
    setOpen(p)
  }, [])
  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const stack = builds.length > 0 ? (
    <div className="bento__stack">

        {builds.map((b) => (

          <button

            key={b.id}

            type="button"

            className="bento__card bento__card--btn bento__card--build"

            onClick={(e) => show(b, e.currentTarget)}

            aria-haspopup="dialog"

          >

            <span className="bento__build-plate">

              {b.logos?.length ? <img src={b.logos[0]} alt="" width={22} height={22} /> : <b.Icon />}

            </span>

            <span className="bento__build-text">

              <span className="bento__kicker">{b.kicker}</span>

              <span className="bento__build-title">{b.title}</span>

              <span className="bento__build-desc">{b.desc}</span>

            </span>

            <span className="bento__build-arrow">

              <ArrowUpRight size={13} weight="bold" aria-hidden="true" />

            </span>

          </button>

        ))}

      </div>
  ) : null

  return (
    <section className="pgrid" aria-labelledby="projects-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Projects</span>
        <h1 className="pgrid__title" id="projects-title">
          The systems behind the scenes.
        </h1>
        <p className="pgrid__lede">Automations, documents, sites, and tools built to keep the business running without you. Open a card to see it full size.</p>
      </header>

      {phone && (
        <div className="pfilter" role="group" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className="pfilter__btn"
              aria-pressed={cat === f.key}
              onClick={() => setCat(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="home__glass pgrid__glass">
        {/* Hung on the sheet's top edge so it reads as a tag on the container,
            not a seventh card. aria-hidden: the lede already says it. */}
        <span className="pgrid__hint" aria-hidden="true">
          <CursorClick size={14} weight="duotone" />
          Click a card to open it
        </span>
        <div className="bento bento--projects">
          {projects.map((p) => (
            <Fragment key={p.id}>
            <button
              type="button"
              className={`bento__card bento__card--btn${p.span ? ' bento__card--wide' : ''}${p.span === 4 ? ' bento__card--full' : ''}`}
              data-id={p.id}
              onClick={(e) => show(p, e.currentTarget)}
              aria-haspopup="dialog"
            >
              <span className="bento__head">
                <Marks p={p} />
                <span className="bento__title">{p.title}</span>
                <span className="bento__desc">{p.desc}</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" className="bento__arrow" />
              </span>
              <p.Preview />
            </button>
            {p.id === 'plan' && stack}
            </Fragment>
          ))}
          {!projects.some((p) => p.id === 'plan') && stack}
        </div>
      </div>

      {open && (
        <ProjectModal project={open} onClose={close}>
          <open.Section />
        </ProjectModal>
      )}
    </section>
  )
}
