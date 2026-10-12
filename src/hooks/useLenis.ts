import { useEffect } from 'react'
import { applyShellScroller } from '@/lib/scrolltrigger'

/**
 * The shell pins the page to the viewport and scrolls this element instead of
 * the document, so every scroll read - Lenis, ScrollTrigger, the nav progress -
 * has to be pointed at it rather than at `window`.
 */
export const SCROLLER_ID = 'main-content'

export function getScroller(): HTMLElement | null {
  return document.getElementById(SCROLLER_ID)
}

/**
 * Smooth-scroll the entire page with Lenis and feed every scroll tick to
 * GSAP ScrollTrigger so any pin / scrub animation reads the smoothed
 * position rather than the raw native scroll.
 *
 * This is the standard Lenis + GSAP integration pattern documented at
 * https://lenis.darkroom.engineering/. Without this wiring, ScrollTrigger
 * would compute progress against the pre-smoothed native scrollY and
 * pinned elements would jitter.
 *
 * Reduced-motion users skip Lenis entirely and let the browser do native
 * scrolling so nothing forces inertia on them.
 *
 * Lenis + GSAP are dynamically imported here (and in PainPoints) so the
 * ~80KB of scroll-engine JS is code-split out and NEVER fetched on touch
 * devices, which use native momentum scroll instead.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Skip Lenis on mobile / tablet devices. Native momentum scroll on
    // those is hardware-accelerated and feels better than Lenis-smoothed
    // scroll fighting touch input. Mid-range Android GPUs burn CPU on
    // the JS-driven scroll loop, causing the laggy feel.
    //
    // Detection: `(pointer: coarse) and (hover: none)` matches phones +
    // tablets but excludes touch-screen LAPTOPS (which have a mouse +
    // touch and benefit from Lenis the same as a desktop). Anchor-click
    // smooth-scroll is handled by `html { scroll-behavior: smooth }` on
    // mobile so navigation still glides.
    const isMobile = window.matchMedia('(pointer: coarse) and (hover: none)').matches
    // Also skip on any narrow viewport - including a resized desktop window.
    // Below 900px the horizontal-pin sections are disabled and the page is a
    // plain vertical stack, where native scroll feels direct. Lenis smoothing
    // on a narrow window reads as "heavy / takes too much scrolling".
    const isNarrow = window.innerWidth < 900
    if (isMobile || isNarrow) return

    let cancelled = false
    let cleanup = () => {}

    void (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      applyShellScroller(ScrollTrigger)

      // Below 1100px the shell dissolves and the document scrolls again, so
      // the wrapper is only handed over when the panel is actually the
      // scroller. Passing a non-scrolling wrapper freezes the page.
      const panel = getScroller()
      const usesPanel = !!panel && window.innerWidth >= 1100

      // The route's content is lazy-loaded (see main.tsx), so on a direct
      // load the panel can still be empty (Suspense fallback is null) at
      // this point. Capturing `content` as undefined here would make Lenis
      // fall back to controlling window scroll while the real scroller
      // (`panel`, which still has its own native overflow) never gets the
      // wheel input - the page reads as completely frozen. Wait for the
      // real child to mount before handing it to Lenis.
      const waitForContent = (el: HTMLElement): Promise<HTMLElement> =>
        new Promise((resolve) => {
          if (el.firstElementChild) {
            resolve(el.firstElementChild as HTMLElement)
            return
          }
          const observer = new MutationObserver(() => {
            if (el.firstElementChild) {
              observer.disconnect()
              resolve(el.firstElementChild as HTMLElement)
            }
          })
          observer.observe(el, { childList: true })
        })
      const content = usesPanel && panel ? await waitForContent(panel) : undefined
      if (cancelled) return

      const lenis = new Lenis({
        ...(usesPanel && content ? { wrapper: panel, content } : {}),
        // Shorter duration + steeper exponential easing makes the wheel feel
        // responsive instead of heavy. 1.1s read as "the page is sluggish";
        // 0.9s still read as "hard to scroll" with a real mouse wheel,
        // whose single notch is one discrete, deliberate input rather than
        // a trackpad's continuous stream - it needs to travel further and
        // settle faster, or every notch feels like it is fighting the page.
        duration: 0.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -14 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.3,
        touchMultiplier: 1.5,
        // A handful of panels (the testimonials ledger, etc.) scroll on their
        // own when their content outgrows a short window. Without this, Lenis
        // still claims every wheel event over them for the outer panel, and
        // the nested list never receives native scroll input at all.
        prevent: (node) => !!node.closest?.('[data-lenis-prevent]'),
      })

      // Hand every Lenis scroll update to ScrollTrigger.
      lenis.on('scroll', ScrollTrigger.update)

      // Drive Lenis from GSAP's ticker so RAF stays unified.
      const tick = (time: number) => {
        lenis.raf(time * 1000)
      }
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      // Intercept in-page anchor clicks (#about, #works, #contact, etc.)
      // and smooth-scroll via Lenis instead of letting the browser hard-jump.
      const NAV_OFFSET = -88 // height of the floating nav pill + breathing room
      const onAnchorClick = (e: MouseEvent) => {
        // Honor modifier keys (open in new tab, etc.)
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        const link = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]')
        if (!link) return
        const href = link.getAttribute('href')
        if (!href || href === '#') return
        // Let the skip link route through native focus management.
        if (href === `#${SCROLLER_ID}`) return

        if (href === '#top') {
          e.preventDefault()
          lenis.scrollTo(0, { duration: 1.1 })
          history.replaceState(null, '', ' ')
          return
        }
        const target = document.querySelector(href) as HTMLElement | null
        if (!target) return
        e.preventDefault()
        lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.1 })
        history.replaceState(null, '', href)
      }
      document.addEventListener('click', onAnchorClick)

      cleanup = () => {
        document.removeEventListener('click', onAnchorClick)
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    })()

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])
}
