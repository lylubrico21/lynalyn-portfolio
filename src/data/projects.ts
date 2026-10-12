export type AppStat = { value: string; label: string }

export type AppScreen = { file: string; label: string }

export type AppProject = {
  name: string
  tagline: string
  description: string
  /** Optional - omit for gradient placeholder cards */
  imageSrc?: string
  /** CSS object-position override. Defaults to 'top center'. */
  imagePosition?: string
  /** External brand color - not a site token. Passed via --app-color inline prop. */
  accentColor: string
  stats: AppStat[]
  badge: string
  /** Optional screenshot strip shown under the card, e.g. inside-the-app
   *  views. Files live in public/apps/<slug>/. Omit until you have shots. */
  screens?: AppScreen[]
  /** public/apps/<slug>/ - required when `screens` is set. */
  screensBasePath?: string
}

/** @deprecated use AppProject */
export type MobileApp = AppProject

/** Internal tools, built solo to replace costly subscriptions. No
 *  screenshots exist, so these use the gradient placeholder card instead
 *  of imageSrc. */
export const mobileApps: MobileApp[] = [
  {
    name: 'DelegateMate CRM',
    tagline: 'A CRM built in-house to skip the subscription stack.',
    description: 'Built for personal use after one too many paid CRM subscriptions, shaped around how the work actually runs instead of the other way around.',
    imageSrc: '/apps/delegatemate-card.png',
    accentColor: '#2563EB',
    stats: [
      { value: 'Solo', label: 'Built by' },
      { value: 'Internal', label: 'Use' },
      { value: 'Active', label: 'Status' },
    ],
    badge: 'CRM',
    screensBasePath: '/apps/delegatemate/',
    screens: [
      { file: 'opportunities-pipeline.jpg', label: 'Opportunities Pipeline & Lead Tracking' },
    ],
  },
  {
    name: 'DelegateSuite',
    tagline: 'An ERP system built to run operations without the subscription stack.',
    description: 'A homegrown ERP built to replace a stack of paid tools with one system built for exactly how the business runs.',
    imageSrc: '/apps/delegatesuite-card.png',
    accentColor: '#7C3AED',
    stats: [
      { value: 'Solo', label: 'Built by' },
      { value: 'Internal', label: 'Use' },
      { value: 'Active', label: 'Status' },
    ],
    badge: 'ERP',
    screensBasePath: '/apps/delegatesuite/',
    screens: [
      { file: 'items-products.jpg', label: 'Items & Products' },
      { file: 'purchase-warehouse-transfer.jpg', label: 'Warehouse Transfer' },
      { file: 'warehouse-list.jpg', label: 'Warehouse List' },
      { file: 'warehouse-report.jpg', label: 'Warehouse Report' },
      { file: 'purchase-daily-report.jpg', label: 'Daily Purchase Report' },
      { file: 'hrm-manage-employee.jpg', label: 'Manage Employee' },
      { file: 'hrm-manage-leave.jpg', label: 'Manage Leave' },
    ],
  },
  {
    name: 'Lyly AI',
    tagline: 'A personal AI COO, built to run operations end to end.',
    description: 'An AI agent built to act as a personal Chief Operating Officer, handling day-to-day operations work without hiring one.',
    // LYLY's face: a cartoonized portrait of Lyann herself, confirmed as
    // LYLY's identity. Real product screenshots still come later.
    imageSrc: '/apps/lyly-card.jpg',
    accentColor: '#EC4899',
    stats: [
      { value: 'Solo', label: 'Built by' },
      { value: 'Internal', label: 'Use' },
      { value: 'In development', label: 'Status' },
    ],
    badge: 'AI Agent',
  },
]
