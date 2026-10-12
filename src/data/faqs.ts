export type QA = { q: string; a: string }

/**
 * The questions people ask before they email. One list, used by the FAQ
 * accordion on the Contact view (and the legacy long-scroll FAQ section).
 * Five questions, two or three sentences each: the accordion sits in a
 * fixed panel and more than that pushes the email row off the plate.
 */
export const FAQS: QA[] = [
  {
    q: 'What do you do?',
    a: 'I help clinic owners, healthcare practices, and agencies build the operations and systems that let them step back from the day to day. GoHighLevel builds, CRM and automation setup, SOPs and playbooks, and AI tools built around how your team already works.',
  },
  {
    q: 'How fast can you start?',
    a: 'Most projects start within a week of our first call, and smaller automation fixes can be live in a few days. I work Manila hours, GMT+8, and keep calls flexible for US and Gulf time zones.',
  },
  {
    q: 'How much do you charge?',
    a: "Pricing depends on scope: a one time systems build, a monthly retainer, or a fractional operations role. Tell me what you're working with and you'll get a clear quote back, not a range.",
  },
  {
    q: 'Where are you based?',
    a: 'Manila, Philippines, GMT+8. Most of my clients are in the US, the Gulf, and Southeast Asia, and we make the time zones work.',
  },
  {
    q: 'What happens after I write?',
    a: "You'll hear back within one business day. If it's a fit, we book a short call, and you walk away with a plan either way.",
  },
]
