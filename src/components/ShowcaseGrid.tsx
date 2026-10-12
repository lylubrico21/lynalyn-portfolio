import TestimonialMarquee from '@/components/TestimonialMarquee'

/**
 * ShowcaseGrid - the /showcase view on one glass sheet.
 *
 * LYLY (the flagship, an AI COO) is still being designed, so this shows an
 * honest "in development" state instead of the Flagship component's full
 * product mock - that mock is a generic job-board demo and would misrepresent
 * what LYLY actually is if reskinned with placeholder screens. Swap the
 * flagship-soon block for <Flagship /> once LYLY has a design and real
 * screens to show. The testimonial marquee runs independently of that - it
 * is about the work generally, not LYLY specifically, so it stays up either
 * way (see TestimonialMarquee.tsx for the "real quotes only" rule).
 */
export default function ShowcaseGrid() {
  return (
    <section className="pgrid ktools" aria-labelledby="showcase-title">
      <header className="pgrid__head ktools__head">
        <div className="ktools__head-copy">
          <span className="pgrid__eyebrow">Showcase</span>
          <h1 className="pgrid__title" id="showcase-title">
            Your flagship product, and the people using it.
          </h1>
          <p className="pgrid__lede">
            Lyly AI, a personal AI COO, is still in development. Here's what it's built to do.
          </p>
        </div>

        <div className="ktools__vote">
          <p className="ktools__vote-label">
            Status
            <span aria-hidden="true" className="ktools__vote-dot" />
            <span className="ktools__vote-ask">In development</span>
          </p>
          <span className="ktools__vote-frame ktools__vote-card">
            <span className="ktools__vote-badge" aria-hidden="true" />
            <span className="ktools__vote-text">
              A full preview goes up once the design is ready.
            </span>
          </span>
        </div>
      </header>

      <div className="home__glass ktools__glass">
        <div className="flagship-soon">
          <span className="flagship-soon__eyebrow">Flagship build</span>
          <span className="flagship-soon__art" aria-hidden="true">
            <img src="/apps/lyly-card.jpg" alt="" loading="lazy" decoding="async" />
          </span>
          <h2 className="flagship-soon__title">Lyly AI</h2>
          <p className="flagship-soon__tagline">A personal AI COO, built to run operations end to end.</p>
          <p className="flagship-soon__desc">
            An AI agent built to act as a personal Chief Operating Officer, handling day-to-day operations work without hiring one. The build works; the design doesn't feel right yet, so the full preview and the people using it will show up here once it does.
          </p>
          <span className="flagship-soon__status">
            <span className="flagship-soon__status-dot" aria-hidden="true" />
            In development
          </span>
        </div>

        <TestimonialMarquee heading="Real feedback, from real clients." />
      </div>
    </section>
  )
}
