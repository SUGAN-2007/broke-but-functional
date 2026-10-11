/* Single source of truth for Broke But Functional
   30-day challenge: Oct 3 to Nov 1. Today is Day 8 (Oct 10).
*/

export interface Transaction {
  id: string
  description: string
  merchant: string
  amount: number
  type: 'debit' | 'credit'
  category: string
  date: string
  time: string
  icon: string
  isExpensive?: boolean
  isAutoSynced?: boolean
}

export interface Category {
  name: string
  spent: number
  budget: number
  color: string
}

export interface Goal {
  id: string
  name: string
  target: number
  saved: number
  deadline: string
  color: string
  icon: string
}

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  dueInDays: number
  status: 'paid' | 'due' | 'overdue'
  category: 'Rent' | 'Entertainment' | 'Utilities' | 'Mobile' | 'Health'
  icon: 'Home' | 'Film' | 'Zap' | 'Smartphone' | 'Wifi' | 'Dumbbell'
  autopay: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  amount: number
  severity: 'low' | 'medium' | 'high'
  resolved?: boolean
  resolvedChoice?: string
  choices: EventChoice[]
}

export interface EventChoice {
  label: string
  tag: string
  consequence: string
  impact: number
}

export interface ForecastPoint {
  day: number
  label: string
  balance: number
  projected?: number
  dangerZone?: boolean
}

export interface InsightCard {
  id: string
  type: 'good' | 'warning' | 'tip'
  headline: string
  body: string
}

export interface CalendarDay {
  dayNumber: number
  dateStr: string // e.g. "Oct 3"
  dayOfWeek: string // "Fri"
  totalSpend: number
  hasIncome?: boolean
  hasBillDue?: boolean
  hasEvent?: boolean
  isFuture: boolean
  isToday?: boolean
  transactions: {
    description: string
    amount: number
    category: string
    isExpensive?: boolean
    isAutoSynced?: boolean
  }[]
}

export interface Connector {
  id: string
  name: string
  type: string
  category: string
  monogram: string
  status: 'connected' | 'not_connected' | 'syncing' | 'needs_attention' | 'coming_soon'
  lastSynced?: string
  importedThisMonth?: number
  autoCategorise?: boolean
  autoAddBills?: boolean
}

export interface SyncInboxItem {
  id: string
  merchant: string
  description: string
  amount: number
  date: string
  category: string
  source: string
  isDuplicate?: boolean
}

export interface SyncLogEntry {
  id: string
  message: string
  timestamp: string
  type: 'success' | 'info' | 'warning'
}

/* ── HERO DATA ───────────────────────────────────────── */
export const heroData = {
  startingBalance: 10000,
  incomeTopUp: 2000,
  balance: 6240,
  day: 8,
  totalDays: 30,
  daysLeft: 22,
  unpaidBills: 1840,
  dailyAllowance: 200, // (6240 - 1840) / 22 = 200
  yesterdaySpend: 310,
  projectedMonthEnd: -320, // Negative / red by Day 26
  dangerDay: 26,
  riskLevel: 'danger' as const,
  healthScore: 68,
}

/* ── TRANSACTIONS (EXPENSES SO FAR SUM TO ₹5,760) ───── */
export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    description: 'Dinner delivery',
    merchant: 'Swiggy',
    amount: 1200,
    type: 'debit',
    category: 'Food',
    date: 'Today',
    time: '8:42 PM',
    icon: 'UtensilsCrossed',
    isExpensive: true,
    isAutoSynced: true,
  },
  {
    id: 'txn-002',
    description: 'Room rent share',
    merchant: 'BankTransfer',
    amount: 3000,
    type: 'debit',
    category: 'Rent',
    date: 'Oct 4',
    time: '10:00 AM',
    icon: 'Home',
    isExpensive: true,
    isAutoSynced: true,
  },
  {
    id: 'txn-003',
    description: 'Pocket money top-up',
    merchant: 'Parents / UPI',
    amount: 2000,
    type: 'credit',
    category: 'Income',
    date: 'Oct 7',
    time: '4:15 PM',
    icon: 'Banknote',
    isAutoSynced: true,
  },
  {
    id: 'txn-004',
    description: 'Metro card recharge',
    merchant: 'Delhi Metro',
    amount: 480,
    type: 'debit',
    category: 'Transport',
    date: 'Oct 6',
    time: '9:15 AM',
    icon: 'Train',
    isAutoSynced: true,
  },
  {
    id: 'txn-005',
    description: 'Exam study guide',
    merchant: 'Amazon',
    amount: 399,
    type: 'debit',
    category: 'Education',
    date: 'Oct 8',
    time: '3:22 PM',
    icon: 'BookOpen',
  },
  {
    id: 'txn-006',
    description: 'Spotify student duo',
    merchant: 'Spotify',
    amount: 119,
    type: 'debit',
    category: 'Entertainment',
    date: 'Oct 5',
    time: '2:00 AM',
    icon: 'Music',
    isAutoSynced: true,
  },
  {
    id: 'txn-007',
    description: 'Chai + samosa run',
    merchant: 'Campus Canteen',
    amount: 119,
    type: 'debit',
    category: 'Entertainment',
    date: 'Oct 9',
    time: '5:30 PM',
    icon: 'Coffee',
  },
  {
    id: 'txn-008',
    description: 'Stationery & photocopy',
    merchant: 'Print Point',
    amount: 223,
    type: 'debit',
    category: 'Misc',
    date: 'Oct 8',
    time: '11:10 AM',
    icon: 'Layers',
  },
  {
    id: 'txn-009',
    description: 'Grocery staples & eggs',
    merchant: 'Blinkit',
    amount: 220,
    type: 'debit',
    category: 'Food',
    date: 'Oct 5',
    time: '7:40 PM',
    icon: 'UtensilsCrossed',
    isAutoSynced: true,
  },
]

/* ── CATEGORIES (SUM = ₹5,760) ────────────────────────── */
export const categories: Category[] = [
  { name: 'Rent', spent: 3000, budget: 3000, color: '#0F4C3A' },
  { name: 'Food', spent: 1420, budget: 2000, color: '#F2A900' },
  { name: 'Transport', spent: 480, budget: 600, color: '#1F9D6B' },
  { name: 'Entertainment', spent: 238, budget: 400, color: '#E8A317' },
  { name: 'Education', spent: 399, budget: 500, color: '#5EE0A0' },
  { name: 'Misc', spent: 223, budget: 500, color: '#8FA095' },
]

/* ── BILLS (UNPAID SUM = ₹1,840) ─────────────────────── */
export const bills: Bill[] = [
  {
    id: 'bill-001',
    name: 'Room Rent Share',
    amount: 3000,
    dueDate: 'Oct 4',
    dueInDays: -6,
    status: 'paid',
    category: 'Rent',
    icon: 'Home',
    autopay: false,
  },
  {
    id: 'bill-002',
    name: 'Gym Membership',
    amount: 500,
    dueDate: 'Oct 11',
    dueInDays: 1,
    status: 'due',
    category: 'Health',
    icon: 'Dumbbell',
    autopay: false,
  },
  {
    id: 'bill-003',
    name: 'Netflix Split',
    amount: 65,
    dueDate: 'Oct 12',
    dueInDays: 2,
    status: 'due',
    category: 'Entertainment',
    icon: 'Film',
    autopay: false,
  },
  {
    id: 'bill-004',
    name: 'Electricity Bill',
    amount: 380,
    dueDate: 'Oct 15',
    dueInDays: 5,
    status: 'due',
    category: 'Utilities',
    icon: 'Zap',
    autopay: false,
  },
  {
    id: 'bill-005',
    name: 'Jio Mobile Prepaid',
    amount: 299,
    dueDate: 'Oct 20',
    dueInDays: 10,
    status: 'due',
    category: 'Mobile',
    icon: 'Smartphone',
    autopay: true,
  },
  {
    id: 'bill-006',
    name: 'Internet (Airtel Fibernet)',
    amount: 596,
    dueDate: 'Oct 28',
    dueInDays: 18,
    status: 'due',
    category: 'Utilities',
    icon: 'Wifi',
    autopay: false,
  },
]

/* ── SAVINGS GOALS (EXACTLY AS SPECIFIED) ─────────────── */
export const goals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Headphones',
    target: 2500,
    saved: 800,
    deadline: 'Oct 30',
    color: '#0F4C3A',
    icon: 'Laptop',
  },
  {
    id: 'goal-002',
    name: 'Emergency Cushion',
    target: 1500,
    saved: 500,
    deadline: 'Nov 1',
    color: '#1F9D6B',
    icon: 'Shield',
  },
  {
    id: 'goal-003',
    name: 'Goa Weekend',
    target: 3000,
    saved: 600,
    deadline: 'Nov 15',
    color: '#F2A900',
    icon: 'Plane',
  },
  {
    id: 'goal-004',
    name: 'Course Fee',
    target: 2000,
    saved: 0,
    deadline: 'Nov 1',
    color: '#E8A317',
    icon: 'GraduationCap',
  },
]

/* ── UNEXPECTED EVENTS ────────────────────────────────── */
export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'Phone screen cracked',
    description: 'Slipped on metro stairs. Screen glass shattered but touch works. Local repair shop quoted ₹1,500.',
    amount: 1500,
    severity: 'high',
    choices: [
      {
        label: 'Pay now (₹1,500)',
        tag: 'repair',
        consequence: 'Instant fix. Daily allowance plunges from ₹200 to ₹131.',
        impact: -1500,
      },
      {
        label: 'Defer 2 weeks',
        tag: 'defer',
        consequence: 'Put tape on it. Risk of cuts or display bleeding, but keeps cash intact now.',
        impact: 0,
      },
      {
        label: 'Borrow backup phone',
        tag: 'skip',
        consequence: 'Use old Redmi phone until month ends. Zero financial hit.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-002',
    title: "Friend's birthday dinner",
    description: "Rohan's turning 22. Group plan is dinner at Big Chill Cafe. Your split estimate is ₹800.",
    amount: 800,
    severity: 'medium',
    choices: [
      {
        label: 'Attend & Pay (₹800)',
        tag: 'social',
        consequence: 'Great memories, but eats 4 days worth of daily allowance.',
        impact: -800,
      },
      {
        label: 'Only drinks/dessert',
        tag: 'counter',
        consequence: 'Show up, celebrate, order just dessert for ₹250.',
        impact: -250,
      },
      {
        label: 'Skip with excuse',
        tag: 'skip',
        consequence: 'Save all ₹800. FOMO for 2 days, balance safe.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-003',
    title: 'Surprise exam fee',
    description: 'University announced university semester certification fee deadline of ₹600 by Oct 18.',
    amount: 600,
    severity: 'high',
    choices: [
      {
        label: 'Pay now (₹600)',
        tag: 'mandatory',
        consequence: 'Academic clearance secured. -₹600 deducted from surplus.',
        impact: -600,
      },
      {
        label: 'Late fee window',
        tag: 'defer',
        consequence: 'Pay next month with ₹100 penalty. Frees up cash this week.',
        impact: 0,
      },
      {
        label: 'Request fee waiver',
        tag: 'waiver',
        consequence: 'Submit departmental application. 50% chance of approval.',
        impact: 0,
      },
    ],
  },
]

export const resolvedEventsHistory = [
  {
    id: 'evt-hist-1',
    title: 'Metro card lost',
    date: 'Oct 5 (Day 3)',
    choiceMade: 'Bought new card (₹200)',
    impact: -200,
    status: 'Resolved',
  },
  {
    id: 'evt-hist-2',
    title: 'Group project printouts',
    date: 'Oct 7 (Day 5)',
    choiceMade: 'Split 4 ways (₹95)',
    impact: -95,
    status: 'Resolved',
  },
]

/* ── FORECAST (DAY 26 IS DANGER DAY, PROJECTED -320) ──── */
export const forecastData: ForecastPoint[] = [
  { day: 1,  label: 'Oct 3', balance: 10000 },
  { day: 3,  label: 'Oct 5', balance: 9400 },
  { day: 5,  label: 'Oct 7', balance: 8710 },
  { day: 8,  label: 'Oct 10', balance: 6240 },
  { day: 11, label: 'Oct 13', balance: 5540, projected: 5540 },
  { day: 14, label: 'Oct 16', balance: 4780, projected: 4780 },
  { day: 18, label: 'Oct 20', balance: 3740, projected: 3740 },
  { day: 22, label: 'Oct 24', balance: 2200, projected: 2200, dangerZone: true },
  { day: 26, label: 'Oct 28', balance: 0, projected: 0, dangerZone: true },
  { day: 30, label: 'Nov 1', balance: -320, projected: -320, dangerZone: true },
]

/* ── HEALTH SCORE REASONS (SUM EXACTLY = 68) ──────────── */
export const healthReasons = [
  { label: 'On-time bill payment record', points: 22, status: 'good' as const },
  { label: 'Budget category adherence', points: 20, status: 'good' as const },
  { label: 'Savings goal discipline', points: 16, status: 'good' as const },
  { label: 'Emergency cushion fund', points: 14, status: 'good' as const },
  { label: 'Discretionary spend limit', points: 12, status: 'good' as const },
  { label: 'Food budget overrun (Swiggy)', points: -8, status: 'bad' as const },
  { label: 'Forecast: dips into red on Oct 28 (Day 26)', points: -8, status: 'bad' as const },
]

/* ── INSIGHTS ─────────────────────────────────────────── */
export const insights: InsightCard[] = [
  {
    id: 'ins-001',
    type: 'warning',
    headline: 'Warning: Balance hits ₹0 on Oct 28 (Day 26)',
    body: 'At current spending velocity (₹310/day vs ₹200 daily allowance), you will run completely out of cash 4 days before month end.',
  },
  {
    id: 'ins-002',
    type: 'good',
    headline: 'Transport is locked down',
    body: 'Only ₹480 spent on metro pass with 22 days left. You will comfortably finish the month with ₹120 transit surplus.',
  },
  {
    id: 'ins-003',
    type: 'tip',
    headline: 'Food is 71% consumed on Oct 10 (Day 8)',
    body: '₹1,420 spent of ₹2,000 food budget. Limiting food spend to ₹26/day or skipping 1 food delivery protects Oct 28 (Day 26).',
  },
]

/* ── 30-DAY SPENDING CALENDAR (OCT 3 - NOV 1) ────────── */
export const calendarDays: CalendarDay[] = [
  // Day 1 - Oct 3 (Fri)
  {
    dayNumber: 1,
    dateStr: 'Oct 3',
    dayOfWeek: 'Fri',
    totalSpend: 150,
    hasIncome: false,
    isFuture: false,
    transactions: [
      { description: 'Notebook & stationery', amount: 150, category: 'Education' }
    ]
  },
  // Day 2 - Oct 4 (Sat)
  {
    dayNumber: 2,
    dateStr: 'Oct 4',
    dayOfWeek: 'Sat',
    totalSpend: 3100,
    hasBillDue: true,
    isFuture: false,
    transactions: [
      { description: 'Room rent share', amount: 3000, category: 'Rent', isExpensive: true, isAutoSynced: true },
      { description: 'Chai & snack', amount: 100, category: 'Food' }
    ]
  },
  // Day 3 - Oct 5 (Sun)
  {
    dayNumber: 3,
    dateStr: 'Oct 5',
    dayOfWeek: 'Sun',
    totalSpend: 339,
    hasBillDue: true,
    isFuture: false,
    transactions: [
      { description: 'Spotify student duo', amount: 119, category: 'Entertainment', isAutoSynced: true },
      { description: 'Blinkit grocery staples', amount: 220, category: 'Food', isAutoSynced: true }
    ]
  },
  // Day 4 - Oct 6 (Mon)
  {
    dayNumber: 4,
    dateStr: 'Oct 6',
    dayOfWeek: 'Mon',
    totalSpend: 480,
    hasBillDue: false,
    isFuture: false,
    transactions: [
      { description: 'Metro card recharge', amount: 480, category: 'Transport', isAutoSynced: true }
    ]
  },
  // Day 5 - Oct 7 (Tue)
  {
    dayNumber: 5,
    dateStr: 'Oct 7',
    dayOfWeek: 'Tue',
    totalSpend: 95,
    hasIncome: true,
    hasEvent: true,
    isFuture: false,
    transactions: [
      { description: 'Pocket money top-up (credit)', amount: -2000, category: 'Income', isAutoSynced: true },
      { description: 'Project printouts', amount: 95, category: 'Education' }
    ]
  },
  // Day 6 - Oct 8 (Wed)
  {
    dayNumber: 6,
    dateStr: 'Oct 8',
    dayOfWeek: 'Wed',
    totalSpend: 622,
    hasBillDue: false,
    isFuture: false,
    transactions: [
      { description: 'Exam study guide', amount: 399, category: 'Education' },
      { description: 'Stationery & photocopy', amount: 223, category: 'Misc' }
    ]
  },
  // Day 7 - Oct 9 (Thu)
  {
    dayNumber: 7,
    dateStr: 'Oct 9',
    dayOfWeek: 'Thu',
    totalSpend: 119,
    hasBillDue: false,
    isFuture: false,
    transactions: [
      { description: 'Canteen snacks', amount: 119, category: 'Food' }
    ]
  },
  // Day 8 - Oct 10 (Fri) [TODAY]
  {
    dayNumber: 8,
    dateStr: 'Oct 10',
    dayOfWeek: 'Fri',
    totalSpend: 1200,
    isToday: true,
    isFuture: false,
    transactions: [
      { description: 'Dinner delivery (Swiggy)', amount: 1200, category: 'Food', isExpensive: true, isAutoSynced: true }
    ]
  },
  // Day 9 - Oct 11 (Sat)
  { dayNumber: 9, dateStr: 'Oct 11', dayOfWeek: 'Sat', totalSpend: 500, hasBillDue: true, isFuture: true, transactions: [{ description: 'Gym Membership (due)', amount: 500, category: 'Health' }] },
  // Day 10 - Oct 12 (Sun)
  { dayNumber: 10, dateStr: 'Oct 12', dayOfWeek: 'Sun', totalSpend: 65, hasBillDue: true, isFuture: true, transactions: [{ description: 'Netflix split (due)', amount: 65, category: 'Entertainment' }] },
  // Day 11 - Oct 13 (Mon)
  { dayNumber: 11, dateStr: 'Oct 13', dayOfWeek: 'Mon', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 12 - Oct 14 (Tue)
  { dayNumber: 12, dateStr: 'Oct 14', dayOfWeek: 'Tue', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 13 - Oct 15 (Wed)
  { dayNumber: 13, dateStr: 'Oct 15', dayOfWeek: 'Wed', totalSpend: 380, hasBillDue: true, isFuture: true, transactions: [{ description: 'Electricity Bill (due)', amount: 380, category: 'Utilities' }] },
  // Day 14 - Oct 16 (Thu)
  { dayNumber: 14, dateStr: 'Oct 16', dayOfWeek: 'Thu', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 15 - Oct 17 (Fri)
  { dayNumber: 15, dateStr: 'Oct 17', dayOfWeek: 'Fri', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 16 - Oct 18 (Sat)
  { dayNumber: 16, dateStr: 'Oct 18', dayOfWeek: 'Sat', totalSpend: 600, hasEvent: true, isFuture: true, transactions: [{ description: 'Surprise exam fee', amount: 600, category: 'Education' }] },
  // Day 17 - Oct 19 (Sun)
  { dayNumber: 17, dateStr: 'Oct 19', dayOfWeek: 'Sun', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 18 - Oct 20 (Mon)
  { dayNumber: 18, dateStr: 'Oct 20', dayOfWeek: 'Mon', totalSpend: 299, hasBillDue: true, isFuture: true, transactions: [{ description: 'Jio Mobile (due)', amount: 299, category: 'Mobile' }] },
  // Day 19 - Oct 21 (Tue)
  { dayNumber: 19, dateStr: 'Oct 21', dayOfWeek: 'Tue', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 20 - Oct 22 (Wed)
  { dayNumber: 20, dateStr: 'Oct 22', dayOfWeek: 'Wed', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 21 - Oct 23 (Thu)
  { dayNumber: 21, dateStr: 'Oct 23', dayOfWeek: 'Thu', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 22 - Oct 24 (Fri)
  { dayNumber: 22, dateStr: 'Oct 24', dayOfWeek: 'Fri', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 23 - Oct 25 (Sat)
  { dayNumber: 23, dateStr: 'Oct 25', dayOfWeek: 'Sat', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 24 - Oct 26 (Sun)
  { dayNumber: 24, dateStr: 'Oct 26', dayOfWeek: 'Sun', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 25 - Oct 27 (Mon)
  { dayNumber: 25, dateStr: 'Oct 27', dayOfWeek: 'Mon', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 26 - Oct 28 (Tue) [DANGER DAY]
  { dayNumber: 26, dateStr: 'Oct 28', dayOfWeek: 'Tue', totalSpend: 596, hasBillDue: true, isFuture: true, transactions: [{ description: 'Airtel Fibernet (due)', amount: 596, category: 'Utilities' }] },
  // Day 27 - Oct 29 (Wed)
  { dayNumber: 27, dateStr: 'Oct 29', dayOfWeek: 'Wed', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 28 - Oct 30 (Thu)
  { dayNumber: 28, dateStr: 'Oct 30', dayOfWeek: 'Thu', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 29 - Oct 31 (Fri)
  { dayNumber: 29, dateStr: 'Oct 31', dayOfWeek: 'Fri', totalSpend: 0, isFuture: true, transactions: [] },
  // Day 30 - Nov 1 (Sat)
  { dayNumber: 30, dateStr: 'Nov 1', dayOfWeek: 'Sat', totalSpend: 0, isFuture: true, transactions: [] },
]

/* ── CONNECTORS / SYNC DATA ───────────────────────────── */
export const connectors: Connector[] = [
  {
    id: 'conn-1',
    name: 'UPI / Payments Feed',
    type: 'UPI & Instant Pay',
    category: 'UPI and payment apps',
    monogram: 'UP',
    status: 'connected',
    lastSynced: '2 mins ago',
    importedThisMonth: 14,
    autoCategorise: true,
    autoAddBills: true,
  },
  {
    id: 'conn-2',
    name: 'Primary Student Account',
    type: 'Bank Account (Read-Only AA)',
    category: 'Bank accounts',
    monogram: 'SB',
    status: 'connected',
    lastSynced: '15 mins ago',
    importedThisMonth: 8,
    autoCategorise: true,
    autoAddBills: true,
  },
  {
    id: 'conn-3',
    name: 'SMS Transaction Reader',
    type: 'Android Local Parser',
    category: 'SMS transaction reader',
    monogram: 'SM',
    status: 'needs_attention',
    lastSynced: 'Yesterday',
    importedThisMonth: 6,
    autoCategorise: false,
    autoAddBills: true,
  },
  {
    id: 'conn-4',
    name: 'Email Receipts & E-Bills',
    type: 'Gmail Receipt Scanner',
    category: 'Email receipts',
    monogram: 'EM',
    status: 'not_connected',
  },
  {
    id: 'conn-5',
    name: 'Campus Payroll & Stipend',
    type: 'Direct Deposit Reader',
    category: 'Payroll and income sources',
    monogram: 'PR',
    status: 'not_connected',
  },
  {
    id: 'conn-6',
    name: 'Split-Bill Syncer',
    type: 'Group Expense Integrator',
    category: 'Split-bill apps',
    monogram: 'SB',
    status: 'coming_soon',
  },
  {
    id: 'conn-7',
    name: 'CSV / Statement Import',
    type: 'Bank Passbook CSV / PDF',
    category: 'CSV / statement import',
    monogram: 'CS',
    status: 'not_connected',
  },
]

export const syncInboxItems: SyncInboxItem[] = [
  {
    id: 'inbox-1',
    merchant: 'Zomato Daily',
    description: 'Breakfast paratha roll',
    amount: 140,
    date: 'Oct 10, 9:20 AM',
    category: 'Food',
    source: 'UPI / Payments Feed',
    isDuplicate: false,
  },
  {
    id: 'inbox-2',
    merchant: 'Zomato Daily',
    description: 'Breakfast paratha roll (repeated entry)',
    amount: 140,
    date: 'Oct 10, 9:21 AM',
    category: 'Food',
    source: 'SMS Transaction Reader',
    isDuplicate: true,
  },
  {
    id: 'inbox-3',
    merchant: 'Stationery World',
    description: 'Spiral notebook A4',
    amount: 85,
    date: 'Oct 9, 4:10 PM',
    category: 'Education',
    source: 'UPI / Payments Feed',
    isDuplicate: false,
  },
]

export const syncActivityLogs: SyncLogEntry[] = [
  {
    id: 'log-1',
    message: 'Auto-imported 14 transactions from UPI / Payments Feed',
    timestamp: '2 mins ago',
    type: 'success',
  },
  {
    id: 'log-2',
    message: 'Pocket money top-up detected: ₹2,000 credited',
    timestamp: 'Oct 7, 4:15 PM',
    type: 'success',
  },
  {
    id: 'log-3',
    message: 'SMS Reader permission token renewal required',
    timestamp: 'Yesterday',
    type: 'warning',
  },
  {
    id: 'log-4',
    message: 'Connected Primary Student Account via RBI Account Aggregator protocol',
    timestamp: 'Oct 3, 10:00 AM',
    type: 'info',
  },
]

/* ── MONTH SUMMARY ────────────────────────────────────── */
export const monthSummary = {
  grade: 'C+',
  totalSpent: 5760,
  totalSaved: 1900,
  startingBudget: 10000,
  incomeTopUp: 2000,
  projectedMonthEnd: -320,
  bestDay: 'Oct 7 (Day 5) — spent only ₹95, got ₹2,000 top-up',
  worstDay: 'Oct 4 (Day 2) — rent share of ₹3,000 paid',
  wins: [
    'Rent ₹3,000 paid immediately without penalty',
    'Transport on track: ₹480 spent vs ₹600 budget',
    'Saved ₹1,900 across headphone & emergency goals',
    'Pocket money top-up of ₹2,000 recorded',
  ],
  mistakes: [
    'Swiggy dinner order of ₹1,200 on Oct 10 (Day 8) blew daily allowance',
    'Food category at 71% limit with 22 days to go',
    'Gym membership ₹500 due with low attendance',
  ],
  planVsActual: {
    planSpendDay8: 3200,
    actualSpendDay8: 5760,
    planBuffer: 1500,
    actualBuffer: 480,
  },
  shareTagline: 'Oct 10 (Day 8 of 30) on ₹10K. Balance: ₹6,240. Risk: Red by Oct 28 (Day 26). Survived so far.',
}

/* ── SIMULATOR DEFAULTS ───────────────────────────────── */
export const simulatorDefaults = {
  item: 'Swiggy dinner',
  amount: 1200,
  category: 'Food',
  date: 'Today (Oct 10)',
}

export const quickScenarios = [
  { label: 'Dinner out', amount: 800, category: 'Food' },
  { label: 'Headphones', amount: 2500, category: 'Education' },
  { label: 'Weekend trip', amount: 3000, category: 'Entertainment' },
  { label: 'Phone repair', amount: 1500, category: 'Misc' },
]

export const categoryOptions = [
  'Food',
  'Transport',
  'Entertainment',
  'Education',
  'Health',
  'Rent',
  'Utilities',
  'Misc',
]
