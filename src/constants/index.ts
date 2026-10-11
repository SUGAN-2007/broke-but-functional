export interface NavItem {
  name: string
  href: string
  icon: string
  badge?: string
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { name: 'Simulator', href: '/simulate', icon: 'GitCompare', badge: 'What-if' },
  { name: 'Calendar', href: '/calendar', icon: 'CalendarDays' },
  { name: 'Commitments', href: '/commitments', icon: 'Receipt' },
  { name: 'Goals', href: '/goals', icon: 'Target' },
  { name: 'Events', href: '/events', icon: 'Zap', badge: '1 Active' },
  { name: 'Summary', href: '/summary', icon: 'FileText' },
  { name: 'Connect', href: '/connect', icon: 'Radio' },
  { name: 'Settings', href: '/settings', icon: 'Sliders' },
]

export const RISK_LEVELS = ['Safe', 'Warning', 'Danger', 'Critical'] as const

export const THRESHOLDS = {
  EXPENSIVE_MULTIPLIER: 1.5,
  EXPENSIVE_PURCHASE: 500,
  STARTING_BUDGET: 10000,
  DAILY_ALLOWANCE: 200,
  DANGER_DAY: 26,
  CURRENT_DAY: 8,
  TOTAL_DAYS: 30,
} as const

export const CHALLENGE_DATES = {
  START: 'Oct 3',
  END: 'Nov 1',
  TOTAL_DAYS: 30,
  YEAR: 2026,
} as const
