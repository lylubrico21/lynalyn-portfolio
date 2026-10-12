import { useState } from 'react'
import { Play, Gauge, Robot, Lightbulb, GraduationCap } from '@/components/slab'
import type { Icon } from '@/components/slab'

/**
 * TestimonialsGrid - the Testimonials view as a fixed viewport.
 *
 * Two columns inside one glass sheet: the video proof on the left, the client
 * ledger on the right. The page is sized to the panel and does not scroll, so
 * both clips share ONE stage and a picker switches between them rather than
 * stacking two players down a column that would never fit.
 *
 * Clips can disagree about orientation, so the stage is ONE fixed plate that
 * each is contained inside. Letting the frame take each clip's own ratio made
 * it jump size on every switch; a single plate keeps the card the same object
 * whichever is playing.
 *
 * To add a video: drop the .mp4 in public/testimonials/, set its `src` below
 * (e.g. '/testimonials/client-1.mp4'), and swap the poster for a still from
 * the clip. With `src` empty the cover stays up and play is disabled.
 */

type Clip = {
  id: string
  index: string
  /** Leave empty until you have the video file. */
  src: string
  poster: string
  duration: string
  kicker: string
  width: number
  height: number
}

const CLIPS: Clip[] = [
  {
    id: 'clip-1',
    index: '01',
    src: '/testimonials/sam-williams.mp4',
    poster: '/testimonials/sam-williams-poster.jpg',
    duration: '0:34',
    kicker: 'Samuel Williams testimonial',
    width: 720,
    height: 1280,
  },
  {
    id: 'clip-2',
    index: '02',
    src: '/testimonials/fibo-lim.mp4',
    poster: '/testimonials/fibo-lim-poster.jpg',
    duration: '0:52',
    kicker: 'Fibo Lim testimonial',
    width: 1280,
    height: 720,
  },
  {
    id: 'clip-3',
    index: '03',
    src: '/testimonials/michelle-ferro.mp4',
    poster: '/testimonials/michelle-ferro-poster.jpg',
    duration: '1:01',
    kicker: 'Michelle Ferro testimonial',
    width: 720,
    height: 1280,
  },
  {
    id: 'clip-4',
    index: '04',
    src: '/testimonials/fad-institute.mp4',
    poster: '/testimonials/fad-institute-poster.jpg',
    duration: '0:37',
    kicker: 'Aya Webhe testimonial',
    width: 1280,
    height: 720,
  },
]

/* The client ledger. `logoSrc` is optional - without it the medallion falls
   back to the icon. */

type Client = {
  index: string
  name: string
  role: string
  daily: string
  work: string[]
  logoSrc?: string
  Icon: Icon
}

const CLIENTS: Client[] = [
  {
    index: '01',
    name: 'Samuel Williams',
    role: 'CEO & Founder, Christmas Elves',
    daily:
      'Built the full lead acquisition system for his lighting company, from first lead to booked appointment, plus employee hiring and training.',
    work: ['Lead acquisition', 'Hiring & training', 'GoHighLevel automation'],
    Icon: Lightbulb,
  },
  {
    index: '02',
    name: 'Fibo Lim',
    role: 'Fibo Lim Group of Companies',
    daily:
      'Operations manager across a multi-company group, bringing operational clarity and systems that work the same way across every entity.',
    work: ['Operational clarity', 'Cross-company systems', 'Multi-entity ops'],
    Icon: Gauge,
  },
  {
    index: '03',
    name: 'Michelle Ferro',
    role: 'CEO, Donut Park PH',
    daily:
      'Built the warehouse, supply chain, ordering, and accounting systems behind a donut franchise that scaled from 54 to 220 branches in 11 months.',
    work: ['Franchise systems', 'Supply chain', '54 to 220 branches'],
    Icon: Robot,
  },
  {
    index: '04',
    name: 'Aya Webhe',
    role: 'Head of Operations, FAD Dubai',
    daily:
      'Built the academic and student acquisition system as Systems Engineer, supporting Operations, the website, marketing, and lead acquisition.',
    work: ['Student acquisition', 'Academic operations', 'Marketing & leads'],
    Icon: GraduationCap,
  },
]

export default function TestimonialsGrid() {
  const [active, setActive] = useState(0)
  // The stage shows the clip's poster as cover art until it is asked to
  // play. A poster can fill the frame edge to edge whichever way the clip is
  // shot; a paused <video> cannot, and letterboxing one orientation into a
  // fixed frame left a third of the plate as dead margin.
  const [playing, setPlaying] = useState(false)
  const clip = CLIPS[active]
  const hasVideo = clip.src !== ''
  const pick = (i: number) => {
    setActive(i)
    setPlaying(false)
  }

  return (
    <section className="pgrid tgrid" aria-labelledby="testimonials-title">
      <header className="pgrid__head">
        <span className="pgrid__eyebrow">Testimonials</span>
        <h1 className="pgrid__title" id="testimonials-title">
          In their own words.
        </h1>
        <p className="pgrid__lede">
          Four clients, on camera, on what changed after working together.
        </p>
      </header>

      <div className="home__glass tgrid__glass">
        {/* Left: one stage, two clips. */}
        <div className="tgrid__reel">
          <div className="tgrid__stage">
            {playing && hasVideo ? (
              // Re-keyed so switching clips mounts a fresh element instead of
              // swapping src on a player that is already mid-playback.
              <video
                key={clip.id}
                className="tgrid__video"
                src={clip.src}
                poster={clip.poster}
                width={clip.width}
                height={clip.height}
                controls
                autoPlay
                playsInline
                aria-label={`Video testimonial ${clip.index} from a client`}
              />
            ) : (
              <button
                type="button"
                className="tgrid__cover"
                onClick={() => hasVideo && setPlaying(true)}
                disabled={!hasVideo}
                aria-label={
                  hasVideo
                    ? `Play client testimonial ${clip.index}, ${clip.duration}`
                    : `Client testimonial ${clip.index}, no video added yet`
                }
              >
                <img
                  key={clip.id}
                  className="tgrid__cover-img"
                  src={clip.poster}
                  alt=""
                  decoding="async"
                />
                <span className="tgrid__cover-shade" aria-hidden="true" />
                {hasVideo && (
                  <span className="tgrid__cover-play" aria-hidden="true">
                    <Play size={26} weight="fill" />
                  </span>
                )}
                <span className="tgrid__cover-meta" aria-hidden="true">
                  <span className="tgrid__cover-kicker">
                    {clip.kicker} {clip.index}
                  </span>
                  <span className="tgrid__cover-sub">
                    {hasVideo
                      ? `${clip.duration} · Tap to play`
                      : 'PLACEHOLDER - add your video to public/testimonials/'}
                  </span>
                </span>
              </button>
            )}
          </div>

          {/* The picker is one segmented control, not two loose chips: two
              cells on a shared plate, the active one lit. */}
          <div className="tgrid__picker" role="group" aria-label="Choose a testimonial">
            {CLIPS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`tgrid__pick${i === active ? ' is-active' : ''}`}
                onClick={() => pick(i)}
                aria-pressed={i === active}
              >
                <span className="tgrid__pick-thumb" aria-hidden="true">
                  <img src={c.poster} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="tgrid__pick-copy">
                  <span className="tgrid__pick-kicker">Testimonial {c.index}</span>
                  <span className="tgrid__pick-meta">{c.duration}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: the client ledger, one row per client. */}
        <div className="tgrid__ledger">
          <div className="tgrid__ledger-head">
            <h2 className="tgrid__ledger-title">Who's in the videos.</h2>
            <p className="tgrid__ledger-sub">The people behind the clips on the left.</p>
          </div>

          {/* One plate, three rows split by hairlines. Three boxed cards each
              carrying their own border read as three separate widgets; a
              single ledger reads as one record. */}
          <ul className="tgrid__clients" role="list" data-lenis-prevent>
            {CLIENTS.map((c) => {
              const FallbackIcon = c.Icon
              return (
                <li key={c.index} className="tgrid__client">
                  <span className="tgrid__client-ghost" aria-hidden="true">{c.index}</span>
                  <span className="tgrid__client-mark" aria-hidden="true">
                    {c.logoSrc ? (
                      <img src={c.logoSrc} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <FallbackIcon size={22} weight="duotone" />
                    )}
                  </span>

                  <span className="tgrid__client-body">
                    <span className="tgrid__client-head">
                      <span className="tgrid__client-name">{c.name}</span>
                      <span className="tgrid__client-role">{c.role}</span>
                    </span>
                    <span className="tgrid__client-daily">{c.daily}</span>
                    <ul className="tgrid__client-tags" role="list">
                      {c.work.map((w, i) => (
                        <li key={`${w}-${i}`} className="tgrid__client-tag">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
