import { useState } from 'react'
import { Star, Quotes, Pause, Play } from '@/components/slab'

/**
 * TestimonialMarquee
 *
 * The scrolling quote strip, extracted from Flagship so it can run on its
 * own wherever there is no finished product mock to pair it with yet (see
 * ShowcaseGrid). Same markup and classes as Flagship's version, so it reuses
 * the existing .flagship__feedback* CSS without duplicating it.
 *
 * Use real quotes only, kept verbatim, with the person's permission.
 */
type Feedback = {
  name: string
  rating: number
  context: string
  quote: string
  tags: string[]
}

const FEEDBACKS: Feedback[] = [
  {
    name: 'Eduard Reformina',
    rating: 5,
    context: 'Go Franchise',
    quote: 'Lyann significantly improved our business processes, making everything run smoothly. I learned a lot from her.',
    tags: ['Smoother processes', 'Team trained'],
  },
  {
    name: 'Gerard El Tawil',
    rating: 5,
    context: 'Dubai Real Estate Owner',
    quote: 'We really appreciated her professionalism and high ethical standards. Very trustworthy. We were really lucky to have her.',
    tags: ['High trust', 'Professional standards'],
  },
  {
    name: 'Bref Machuh',
    rating: 5,
    context: 'PGP Marketing Agency',
    quote: 'Lyann Lubrico is the major win!',
    tags: ['Agency operations transformed'],
  },
  {
    name: 'Bradley Faris',
    rating: 5,
    context: 'AGT',
    quote: "We've got a ROCKSTAR in Lyann. Continues to impress us on the daily, and buying back my time to concentrate on other items has been amazing!",
    tags: ['Owner time freed', 'Faster delivery', 'Team accountability'],
  },
  {
    name: 'Fibo Lim',
    rating: 5,
    context: 'Fibo Lim Group of Companies',
    quote: 'Lyann is one of the best operations managers we have worked with. I can really say that she is so different.',
    tags: ['Operational clarity', 'Cross-company systems'],
  },
]

export default function TestimonialMarquee({
  heading = 'Your testimonials heading.',
}: {
  heading?: string
}) {
  const [paused, setPaused] = useState(false)

  return (
    <div className="flagship__feedback" aria-labelledby="flagship-feedback-heading">
      <header className="flagship__feedback-header">
        <span className="flagship__feedback-eyebrow">What people say about my work</span>
        <h4 className="flagship__feedback-title" id="flagship-feedback-heading">
          {heading}
        </h4>
        <button
          type="button"
          className="flagship__feedback-pause"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          aria-label={paused ? 'Resume scrolling testimonials' : 'Pause scrolling testimonials'}
        >
          {paused ? (
            <Play weight="fill" size={14} aria-hidden="true" />
          ) : (
            <Pause weight="fill" size={14} aria-hidden="true" />
          )}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </header>
      <div className={`flagship__feedback-marquee${paused ? ' is-paused' : ''}`}>
        <div
          className="flagship__feedback-track"
          style={paused ? { animationPlayState: 'paused' } : undefined}
        >
          {[...FEEDBACKS, ...FEEDBACKS].map((f, i) => (
            <figure key={`${f.name}-${i}`} className="flagship__feedback-card">
              <Quotes
                className="flagship__feedback-quotemark"
                weight="fill"
                size={28}
                aria-hidden="true"
              />
              <div
                className="flagship__feedback-rating"
                role="img"
                aria-label={`${f.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    weight={idx < f.rating ? 'fill' : 'regular'}
                    size={14}
                    className={idx < f.rating ? 'flagship__feedback-star is-filled' : 'flagship__feedback-star'}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flagship__feedback-quote">{f.quote}</blockquote>
              {f.tags.length > 0 && (
                <ul className="flagship__feedback-tags" role="list">
                  {f.tags.map((tag) => (
                    <li key={tag} className="flagship__feedback-tag">{tag}</li>
                  ))}
                </ul>
              )}
              <figcaption className="flagship__feedback-author">
                <span className="flagship__feedback-name">{f.name}</span>
                <span className="flagship__feedback-meta">
                  <span className="flagship__feedback-context">{f.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
