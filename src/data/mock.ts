/* Transactions, category expenses, goals, events data */

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
  category: string
  autopay: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  amount: number
  severity: 'low' | 'medium' | 'high'
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

/* ── HERO DATA ───────────────────────────────────────── */
export const heroData = {
  balance: 6240,
  startingBalance: 10000,
  day: 8,
  totalDays: 30,
  dailyAllowance: 311,
  yesterdaySpend: 428,
  projectedMonthEnd: 720,
  riskLevel: 'medium' as const,
  healthScore: 68,
}

/* ── TRANSACTIONS ─────────────────────────────────────── */
export const transactions: Transaction[] = [
  {
    id: 'txn-001',
    description: 'Dinner delivery',
    merchant: 'Swiggy',
    amount: 349,
    type: 'debit',
    category: 'Food',
    date: 'Today',
    time: '8:42 PM',
    icon: 'UtensilsCrossed',
  },
  {
    id: 'txn-002',
    description: 'Monthly rent share',
    merchant: 'BankTransfer',
    amount: 3000,
    type: 'debit',
    category: 'Rent',
    date: 'Oct 10',
    time: '10:00 AM',
    icon: 'Home',
  },
  {
    id: 'txn-003',
    description: 'Metro card recharge',
    merchant: 'Delhi Metro',
    amount: 200,
    type: 'debit',
    category: 'Transport',
    date: 'Oct 10',
    time: '9:15 AM',
    icon: 'Train',
  },
  {
    id: 'txn-004',
    description: 'Salary credited',
    merchant: 'Razorpay Payroll',
    amount: 10000,
    type: 'credit',
    category: 'Income',
    date: 'Oct 3',
    time: '12:00 PM',
    icon: 'Banknote',
  },
  {
    id: 'txn-005',
    description: 'Monthly subscription',
    merchant: 'Spotify',
    amount: 119,
    type: 'debit',
    category: 'Entertainment',
    date: 'Oct 5',
    time: '2:00 AM',
    icon: 'Music',
  },
  {
    id: 'txn-006',
    description: 'Coffee + pastry',
    merchant: 'Blue Tokai',
    amount: 280,
    type: 'debit',
    category: 'Food',
    date: 'Oct 9',
    time: '11:30 AM',
    icon: 'Coffee',
  },
  {
    id: 'txn-007',
    description: 'UPSC book',
    merchant: 'Amazon',
    amount: 399,
    type: 'debit',
    category: 'Education',
    date: 'Oct 8',
    time: '3:22 PM',
    icon: 'BookOpen',
  },
  {
    id: 'txn-008',
    description: 'Auto to office',
    merchant: 'Rapido',
    amount: 85,
    type: 'debit',
    category: 'Transport',
    date: 'Oct 11',
    time: '9:05 AM',
    icon: 'Car',
  },
]

/* ── CATEGORIES ───────────────────────────────────────── */
export const categories: Category[] = [
  { name: 'Rent', spent: 3000, budget: 3000, color: '#0F4C3A' },
  { name: 'Food', spent: 1420, budget: 2000, color: '#F2A900' },
  { name: 'Transport', spent: 480, budget: 600, color: '#1F9D6B' },
  { name: 'Entertainment', spent: 238, budget: 400, color: '#E8A317' },
  { name: 'Education', spent: 399, budget: 500, color: '#5EE0A0' },
  { name: 'Misc', spent: 223, budget: 500, color: '#8FA095' },
]

/* ── BILLS ────────────────────────────────────────────── */
export const bills: Bill[] = [
  {
    id: 'bill-001',
    name: 'Room Rent Share',
    amount: 3000,
    dueDate: 'Oct 10',
    dueInDays: -1,
    status: 'paid',
    category: 'Housing',
    autopay: false,
  },
  {
    id: 'bill-002',
    name: 'Electricity Bill',
    amount: 340,
    dueDate: 'Oct 15',
    dueInDays: 4,
    status: 'due',
    category: 'Utilities',
    autopay: false,
  },
  {
    id: 'bill-003',
    name: 'Jio Prepaid',
    amount: 299,
    dueDate: 'Oct 20',
    dueInDays: 9,
    status: 'due',
    category: 'Mobile',
    autopay: true,
  },
  {
    id: 'bill-004',
    name: 'Spotify Premium',
    amount: 119,
    dueDate: 'Oct 5',
    dueInDays: -6,
    status: 'paid',
    category: 'Entertainment',
    autopay: true,
  },
  {
    id: 'bill-005',
    name: 'Internet (Airtel)',
    amount: 599,
    dueDate: 'Oct 28',
    dueInDays: 17,
    status: 'due',
    category: 'Utilities',
    autopay: false,
  },
  {
    id: 'bill-006',
    name: 'Netflix Split',
    amount: 65,
    dueDate: 'Oct 12',
    dueInDays: 1,
    status: 'due',
    category: 'Entertainment',
    autopay: false,
  },
  {
    id: 'bill-007',
    name: 'Gym Membership',
    amount: 800,
    dueDate: 'Sep 30',
    dueInDays: -11,
    status: 'overdue',
    category: 'Health',
    autopay: false,
  },
]

/* ── SAVINGS GOALS ────────────────────────────────────── */
export const goals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Emergency Fund',
    target: 15000,
    saved: 4200,
    deadline: 'Dec 2026',
    color: '#0F4C3A',
    icon: 'Shield',
  },
  {
    id: 'goal-002',
    name: 'New Laptop',
    target: 55000,
    saved: 12000,
    deadline: 'Mar 2027',
    color: '#F2A900',
    icon: 'Laptop',
  },
  {
    id: 'goal-003',
    name: 'Goa Trip',
    target: 8000,
    saved: 3500,
    deadline: 'Jan 2027',
    color: '#1F9D6B',
    icon: 'Plane',
  },
  {
    id: 'goal-004',
    name: 'Course Fee (UPSC)',
    target: 20000,
    saved: 6000,
    deadline: 'Feb 2027',
    color: '#E8A317',
    icon: 'GraduationCap',
  },
]

/* ── EVENTS ───────────────────────────────────────────── */
export const events: Event[] = [
  {
    id: 'evt-001',
    title: 'Friend\'s birthday dinner',
    description: 'Rohan\'s turning 24. The group\'s going to Fatty Bao, Hauz Khas.',
    amount: 1200,
    severity: 'medium',
    choices: [
      {
        label: 'Pay now',
        tag: 'social',
        consequence: 'Balance drops ₹1,200. Daily allowance tightens to ₹232.',
        impact: -1200,
      },
      {
        label: 'Counter-offer',
        tag: 'negotiate',
        consequence: 'Suggest a cheaper spot. Social capital risk: low.',
        impact: -500,
      },
      {
        label: 'Rain check',
        tag: 'skip',
        consequence: 'You miss the moment. Balance untouched.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-002',
    title: 'Laptop charger died',
    description: 'Dell OEM charger gave up mid-deadline. Alternatives: ₹899 original, ₹349 local.',
    amount: 899,
    severity: 'high',
    choices: [
      {
        label: 'Original (₹899)',
        tag: 'safe',
        consequence: 'Guaranteed safe for the laptop. Hurts the wallet.',
        impact: -899,
      },
      {
        label: 'Local (₹349)',
        tag: 'risk',
        consequence: 'Saves ₹550 now. 30% chance of battery damage later.',
        impact: -349,
      },
      {
        label: 'Borrow from lab',
        tag: 'defer',
        consequence: 'Free for 3 days. Still need to buy eventually.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-003',
    title: 'Medical: urgent OPD visit',
    description: 'Persistent throat infection. Walk-in OPD at Apollo costs ₹600 + meds ~₹250.',
    amount: 850,
    severity: 'high',
    choices: [
      {
        label: 'Go now',
        tag: 'health',
        consequence: '₹850 spent. Non-negotiable. Health first.',
        impact: -850,
      },
      {
        label: 'Teleconsult',
        tag: 'smart',
        consequence: 'Practo at ₹199. Saves ₹651. Works for minor cases.',
        impact: -199,
      },
      {
        label: 'Home remedies',
        tag: 'risky',
        consequence: 'No spend. High risk: could worsen over 3–5 days.',
        impact: 0,
      },
    ],
  },
]

/* ── FORECAST ─────────────────────────────────────────── */
export const forecastData: ForecastPoint[] = [
  { day: 1, label: 'Oct 3', balance: 10000 },
  { day: 3, label: 'Oct 5', balance: 9400 },
  { day: 5, label: 'Oct 7', balance: 8710 },
  { day: 8, label: 'Oct 10', balance: 6240 },
  { day: 10, label: 'Oct 12', balance: 5800, projected: 5800 },
  { day: 13, label: 'Oct 15', balance: 5460, projected: 5460, dangerZone: false },
  { day: 15, label: 'Oct 17', balance: 5120, projected: 5120 },
  { day: 18, label: 'Oct 20', balance: 4290, projected: 4290 },
  { day: 20, label: 'Oct 22', balance: 3710, projected: 3710 },
  { day: 23, label: 'Oct 25', balance: 2900, projected: 2900, dangerZone: true },
  { day: 25, label: 'Oct 27', balance: 2320, projected: 2320, dangerZone: true },
  { day: 28, label: 'Oct 30', balance: 1480, projected: 1480, dangerZone: true },
  { day: 30, label: 'Nov 1', balance: 720, projected: 720, dangerZone: true },
]

/* ── INSIGHTS ─────────────────────────────────────────── */
export const insights: InsightCard[] = [
  {
    id: 'ins-001',
    type: 'warning',
    headline: 'Food spend is 71% of budget on Day 8',
    body: 'You\'ve spent ₹1,420 on food in 8 days — that\'s ₹177/day against a ₹67/day target. Cut 2 Swiggy orders a week and save ₹556 by month-end.',
  },
  {
    id: 'ins-002',
    type: 'good',
    headline: 'Transport is under control 🎉',
    body: 'Only ₹480 spent vs ₹600 budget. At this rate you end the month ₹120 ahead on commute costs.',
  },
  {
    id: 'ins-003',
    type: 'tip',
    headline: 'Gym membership is overdue',
    body: 'You\'ve been paying ₹800/month but last logged 0 gym visits this month. Skip for October, redirect to Emergency Fund.',
  },
]

/* ── HEALTH SCORE REASONS ─────────────────────────────── */
export const healthReasons = [
  { label: 'On-time bill payments', points: 20, status: 'good' as const },
  { label: 'Savings goal progress', points: 18, status: 'good' as const },
  { label: 'Food budget overrun', points: -8, status: 'bad' as const },
  { label: 'Daily allowance discipline', points: 22, status: 'good' as const },
  { label: 'Gym membership overdue', points: -6, status: 'bad' as const },
  { label: 'No impulse purchases', points: 12, status: 'good' as const },
  { label: 'Forecast: dips into red by day 28', points: -10, status: 'bad' as const },
]

/* ── MONTH SUMMARY ────────────────────────────────────── */
export const monthSummary = {
  grade: 'B+',
  totalSpent: 9280,
  totalSaved: 720,
  bestDay: 'Oct 7 — spent only ₹89',
  worstDay: 'Oct 10 — rent + groceries, ₹3,480',
  wins: [
    'Cooked at home 14 days straight',
    'Hit transport budget — ₹120 surplus',
    'Zero subscription impulse buys',
    'Emergency fund grew by ₹1,200',
  ],
  mistakes: [
    'Swiggy 11× in 30 days (₹3,800 total)',
    'Gym membership paid, never used',
    'Forgot to track 3 cash expenses',
  ],
  shareTagline: 'Survived October on ₹10K. Grade: B+. Not bad, not great.',
}

/* ── SIMULATOR DEFAULTS ───────────────────────────────── */
export const simulatorDefaults = {
  item: '',
  amount: 0,
  category: 'Food',
  date: 'Today',
}

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
