/**
 * The systems tree shown in the Projects "systems" pop-up (and as chips on
 * Home and in the Projects bento card).
 *
 * This file is the ONLY place node copy lives. AIStack.tsx and AIStackGrid.tsx
 * render whatever shape they find here, so swapping in content is a data edit
 * and never a JSX edit. Keep the exported names and types stable.
 *
 * Every value below is a PLACEHOLDER. Shape rules:
 * - The root is you. Its children are the categories (branches).
 * - A branch with `status` is itself a system; a branch without one is a
 *   group whose children are the systems.
 * - Status is what the thing actually does today: "Live" (in use by others),
 *   "Internal" (works, you use it), "Beta".
 * - Logo marks in AIStackGrid.tsx are keyed by the node `id` below.
 */

import {
  Sparkle,
  Heartbeat,
  Hospital,
  Megaphone,
  Storefront,
  Lightbulb,
  Buildings,
  GraduationCap,
} from '@/components/slab'
import type { Icon } from '@/components/slab'
import { profile } from '@/data/profile'

export type StackStatus = 'Live' | 'Internal' | 'Beta'

/** A vendor mark, masked to a single ink colour so the row reads as one set
 *  rather than a rainbow of brand palettes. Only marks that already exist in
 *  public/icons are listed. */
export type StackLogo = { src: string; name: string }

export type StackNode = {
  id: string
  name: string
  /** One plain sentence a non-technical client understands. */
  what: string
  /** Real stack / model / where it runs. Rendered small and muted. */
  stack?: string
  status?: StackStatus
  /** Phosphor glyph for the card's mark tile. Every node has one. */
  Icon: Icon
  logos?: StackLogo[]
  children?: StackNode[]
}

const GHL: StackLogo = { src: '/icons/gohighlevel.png', name: 'GoHighLevel' }
const ZAPIER: StackLogo = { src: '/icons/zapier.png', name: 'Zapier' }
const ASANA: StackLogo = { src: '/icons/asana.svg', name: 'Asana' }
const MICROSOFT: StackLogo = { src: '/icons/microsoft.png', name: 'Microsoft' }
const META: StackLogo = { src: '/icons/meta.svg', name: 'Meta' }
const SEMRUSH: StackLogo = { src: '/icons/semrush.svg', name: 'SEMrush' }
const GOOGLE_WORKSPACE: StackLogo = { src: '/icons/googleworkspace.svg', name: 'Google Workspace' }
const MONDAY: StackLogo = { src: '/icons/monday.jpg', name: 'Monday.com' }
const SLACK: StackLogo = { src: '/icons/slack.svg', name: 'Slack' }
const SHOPIFY: StackLogo = { src: '/icons/shopify.svg', name: 'Shopify' }
const MAKE: StackLogo = { src: '/icons/make.png', name: 'Make' }
const WIX: StackLogo = { src: '/icons/wix.svg', name: 'Wix' }
const CLICKUP: StackLogo = { src: '/icons/clickup.svg', name: 'ClickUp' }

/** Single root: you. Branches are the categories, ordered to lead with the
 *  target market (clinics and hospitals) before the rest. */
export const aiStack: StackNode = {
  id: 'root',
  Icon: Sparkle,
  name: profile.name,
  what: 'A look at the systems running inside client businesses right now.',
  stack: 'Operations systems for real businesses',
  children: [
    {
      id: 'category-healthcare',
      Icon: Heartbeat,
      name: 'Healthcare & Medical',
      what: 'Clinics, hospitals, and the agency behind them - the core market this work is built for.',
      children: [
        {
          id: 'project-a',
          Icon: Heartbeat,
          logos: [SEMRUSH, GHL, ASANA],
          name: 'Pediatric Practice',
          what: 'Local SEO and lead automation for a 2-branch pediatric practice, turning digital exposure into booked patients.',
          stack: 'SEMrush, GoHighLevel, Asana',
          status: 'Live',
        },
        {
          id: 'project-b',
          Icon: Hospital,
          logos: [MICROSOFT, GHL, META],
          name: 'Bernardino Private Hospital',
          what: 'Automated registration, onboarding, and ad campaigns for a 3-branch hospital group, a 1 to 3 day process cut to 20 to 30 minutes.',
          stack: 'Microsoft, GoHighLevel, Meta, Eliza Chatbot',
          status: 'Live',
        },
        {
          id: 'project-c',
          Icon: Megaphone,
          logos: [GHL, GOOGLE_WORKSPACE, ZAPIER, MAKE, MONDAY, SEMRUSH, SLACK],
          name: 'Practice Growth Partners',
          what: 'Nearly three years as Operations Manager and Systems Engineer, building the playbook that scaled the agency from 48 to 250+ clinics across a 52-person team.',
          stack: 'GoHighLevel, Google Workspace, Zapier, Make, Monday.com, SEMrush, Freshdesk, Slack',
          status: 'Live',
        },
      ],
    },
    {
      id: 'category-franchise',
      Icon: Storefront,
      name: 'Franchise & Retail Systems',
      what: 'Operations built to scale past one location without the founder in every branch.',
      children: [
        {
          id: 'project-d',
          Icon: Storefront,
          logos: [GHL, ZAPIER, SHOPIFY, GOOGLE_WORKSPACE, ASANA],
          name: 'Donut Park PH',
          what: 'Warehouse, supply chain, ordering, and accounting systems built as COO, scaling a donut franchise from 54 to 220 branches in 11 months.',
          stack: 'GoHighLevel, Zapier, Shopify, Google Workspace, Asana',
          status: 'Live',
        },
        {
          id: 'project-e',
          Icon: Lightbulb,
          logos: [GHL, ZAPIER],
          name: 'Christmas Elves',
          what: 'End-to-end lead acquisition system for a lighting company, from first lead to booked appointment, plus employee hiring and training.',
          stack: 'GoHighLevel, Zapier, Markate CRM',
          status: 'Live',
        },
      ],
    },
    {
      id: 'category-other',
      Icon: Buildings,
      name: 'Real Estate & Education',
      what: 'Lead and enrollment systems outside the core market.',
      children: [
        {
          id: 'project-f',
          Icon: Buildings,
          logos: [GHL, ZAPIER, MAKE],
          name: 'Freedom Hill Real Estate',
          what: 'A done-for-you CRM and chatbot system that took one agent from a 20 to 50 client bottleneck to about 180 qualified clients.',
          stack: 'GoHighLevel, Chatbots, Zapier, Make',
          status: 'Live',
        },
        {
          id: 'project-g',
          Icon: GraduationCap,
          logos: [META, GHL, WIX, ZAPIER, CLICKUP],
          name: 'FAD Dubai Fashion School',
          what: 'Chatbot and social automation for a Dubai fashion institute, handling enrollment enquiries around the clock.',
          stack: 'Meta, GoHighLevel, Wix, Zapier, Chatbot, ClickUp',
          status: 'Live',
        },
      ],
    },
  ],
}
