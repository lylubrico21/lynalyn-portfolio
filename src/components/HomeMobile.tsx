import { Link } from 'react-router-dom'
import { SealCheck, CaretRight, Play } from '@/components/slab'
import { profile } from '@/data/profile'
import QuickMenu from './QuickMenu'

/**
 * Home on a phone, the parts the rail and the bento used to carry:
 *
 *   HomeProfile  avatar, name, verified mark, handle and the QuickMenu
 *                (theme + accessibility) - the rail's identity block, laid flat
 *   HomeStats    three proof facts (profile.stats), each named by a glyph so
 *                it reads at a glance
 *   HomeExplore  one shelf card per rail view in a snap row, then the first
 *                testimonial as a video stage
 */

export function HomeProfile() {
  return (
    <header className="hprofile">
      <img className="hprofile__avatar" src={profile.avatarSrc} alt="" width={56} height={56} />
      <div className="hprofile__who">
        <span className="hprofile__name">
          {profile.name}
          <SealCheck size={16} weight="fill" className="hprofile__verified" aria-label={profile.verifiedLabel} />
        </span>
        <span className="hprofile__handle">
          {profile.handle} · {profile.role}
        </span>
      </div>
      <QuickMenu className="hprofile__menu" />
    </header>
  )
}

export function HomeStats() {
  return (
    <ul className="hstats" role="list">
      {profile.stats.map(({ value, label, Icon }, i) => (
        <li key={i}>
          <Icon className="hstats__icon" size={18} weight="duotone" aria-hidden="true" />
          <b className="hstats__value">{value}</b>
          <span className="hstats__label">{label}</span>
        </li>
      ))}
    </ul>
  )
}

const TILES = [
  { n: '01', label: 'Projects', to: '/projects', title: 'The systems behind the scenes.', desc: 'Real automations, case studies, and sites built for clients.', img: '/home/samples-donut-park.jpeg' },
  { n: '02', label: 'Services', to: '/services', title: 'Everything you offer, in one line each.', desc: 'Five ways to work together, from an audit to a full build.', img: '/placeholders/monday-team-dashboard.jpg' },
  { n: '03', label: 'Showcase', to: '/showcase', title: 'Your flagship product, and the people using it.', desc: 'Lyly AI, a personal AI COO, still in development.', img: '/apps/lyly-card.jpg', accent: true },
  { n: '04', label: 'Testimonials', to: '/testimonials', title: 'In their own words.', desc: 'Three clients, on camera, on what changed.', img: '/testimonials/sam-williams-poster.jpg' },
  { n: '05', label: 'About', to: '/about', title: `Hi, I'm ${profile.firstName}, better known as Lyann.`, desc: '15 years across 3 countries, now building Lyly AI.', img: profile.avatarSrc },
] as const

export function HomeExplore() {
  return (
    <>
      <div className="hsec">
        <h2 className="hsec__title">Explore</h2>
      </div>
      <ul className="htiles" role="list">
        {TILES.map((t) => (
          <li key={t.to}>
            <Link to={t.to} className={`htile${'accent' in t && t.accent ? ' htile--accent' : ''}`}>
              <span className="htile__media"><img className="htile__img" src={t.img} alt="" loading="lazy" /></span>
              <span className="htile__body">
                <span className="htile__n">{t.n} {t.label}</span>
                <span className="htile__title">{t.title}</span>
                <span className="htile__desc">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* A header that links carries its chevron on the title itself. */}
      <div className="hsec">
        <h2 className="hsec__title">
          <Link to="/testimonials" className="hsec__link">
            What clients say
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </Link>
        </h2>
      </div>
      <Link to="/testimonials" className="hproof" aria-label="Client testimonial from Samuel Williams, CEO and Founder of Christmas Elves.">
        <span className="hproof__stage">
          <img src="/testimonials/sam-williams-poster.jpg" alt="" loading="lazy" />
          <span className="hproof__play" aria-hidden="true"><Play size={20} weight="fill" /></span>
          <span className="hproof__dur" aria-hidden="true">0:34</span>
        </span>
        <span className="hproof__copy">
          <span className="hproof__title">Built the full lead acquisition system for his lighting company.</span>
          <span className="hproof__meta">Samuel Williams · CEO &amp; Founder, Christmas Elves</span>
        </span>
      </Link>
    </>
  )
}
