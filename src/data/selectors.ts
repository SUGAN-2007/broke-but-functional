import { transactions } from './transactions'
import { bills } from './bills'
import { goals } from './goals'
import type {
  Transaction,
  CalendarDay,
  CategorySpend,
  TransactionCategory,
  ForecastPoint,
  HealthScoreReason,
  RiskLevel,
  HeroData,
  MonthSummary,
} from '@/types/finance'

export { transactions, bills, goals }
export type { CalendarDay, HeroData, MonthSummary }

/* ── PURE HELPER SELECTORS ────────────────────────────── */

export function sumBy<T>(
  items: T[],
  selector: keyof T | ((item: T) => number)
): number {
  return items.reduce((acc, curr) => {
    const val = typeof selector === 'function' ? selector(curr) : Number(curr[selector])
    return acc + (Number.isNaN(val) ? 0 : val)
  }, 0)
}

export function groupByDay(txns: Transaction[]): Record<number, Transaction[]> {
  const map: Record<number, Transaction[]> = {}
  for (const t of txns) {
    if (!map[t.dayNumber]) map[t.dayNumber] = []
    map[t.dayNumber].push(t)
  }
  return map
}

export function groupByCategory(txns: Transaction[]): Record<string, number> {
  const map: Record<string, number> = {}
  for (const t of txns) {
    if (t.type === 'debit') {
      map[t.category] = (map[t.category] || 0) + t.amount
    }
  }
  return map
}

export function getDaysUntil(dayNumber: number, currentDay = 8): number {
  return dayNumber - currentDay
}

/* ── CORE CONSTANTS & DERIVED TOTALS ──────────────────── */

export const STARTING_BUDGET = 10000
export const CURRENT_DAY = 8
export const TOTAL_DAYS = 30
export const DANGER_DAY = 26

// Derived Inflow & Outflow
export const totalIncomeTopUp = sumBy(
  transactions.filter((t) => t.type === 'credit'),
  (t) => t.amount
)

export const totalSpent = sumBy(
  transactions.filter((t) => t.type === 'debit'),
  (t) => t.amount
)

export const liquidBalance = STARTING_BUDGET + totalIncomeTopUp - totalSpent

export const unpaidBillsTotal = sumBy(
  bills.filter((b) => b.status !== 'paid'),
  (b) => b.amount
)

export const paidBillsTotal = sumBy(
  bills.filter((b) => b.status === 'paid'),
  (b) => b.amount
)

export const daysLeft = TOTAL_DAYS - CURRENT_DAY // 22

export const calculatedDailyAllowance = Math.max(
  0,
  Math.round((liquidBalance - unpaidBillsTotal) / daysLeft)
) // (6240 - 1840) / 22 = 200

export const totalSaved = sumBy(goals, (g) => g.currentAmount) // 800 + 1000 + 100 = 1900

export const heroData: HeroData = {
  startingBalance: STARTING_BUDGET,
  incomeTopUp: totalIncomeTopUp,
  balance: liquidBalance,
  day: CURRENT_DAY,
  totalDays: TOTAL_DAYS,
  daysLeft,
  unpaidBills: unpaidBillsTotal,
  dailyAllowance: calculatedDailyAllowance,
  yesterdaySpend: sumBy(
    transactions.filter((t) => t.dayNumber === 7 && t.type === 'debit'),
    (t) => t.amount
  ), // 160 + 847 = 1007
  projectedMonthEnd: -320,
  dangerDay: DANGER_DAY,
  riskLevel: 'Danger' as RiskLevel,
  healthScore: 68,
}

/* ── CATEGORY BREAKDOWN DERIVED FROM TRANSACTIONS ─────── */

const categoryBudgets: Record<TransactionCategory, { budget: number; color: string }> = {
  Rent:          { budget: 3000, color: 'var(--brand)' },
  Food:          { budget: 2000, color: 'var(--accent)' },
  Transport:     { budget: 600,  color: '#4a825e' },
  Entertainment: { budget: 400,  color: '#d4883b' },
  Health:        { budget: 500,  color: '#8b949e' },
  Education:     { budget: 400,  color: '#5b8a99' },
  Utilities:     { budget: 1100, color: '#a371f7' },
  Income:        { budget: 0,    color: 'var(--safe)' },
  Other:         { budget: 200,  color: '#6e7681' },
}

export function getCategorySpends(): CategorySpend[] {
  const grouped = groupByCategory(transactions)
  const categoriesList: TransactionCategory[] = [
    'Rent',
    'Food',
    'Transport',
    'Entertainment',
    'Health',
    'Education',
  ]

  return categoriesList.map((cat) => ({
    name: cat,
    spent: grouped[cat] || 0,
    budget: categoryBudgets[cat]?.budget || 1000,
    color: categoryBudgets[cat]?.color || 'var(--brand)',
  }))
}

export const categories = getCategorySpends()

/* ── 30-DAY CALENDAR MATRIX (OCT 3 TO NOV 1, 2026) ───── */

const dayOfWeekMap: string[] = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export function getCalendarDays(): CalendarDay[] {
  const txByDay = groupByDay(transactions)
  const billsByDay: Record<number, boolean> = {}
  for (const b of bills) {
    billsByDay[b.dayNumber] = true
  }

  const days: CalendarDay[] = []

  for (let d = 1; d <= TOTAL_DAYS; d++) {
    const dayTxns = txByDay[d] || []
    const debitTxns = dayTxns.filter((t) => t.type === 'debit')
    const hasCredit = dayTxns.some((t) => t.type === 'credit')
    const totalDaySpend = sumBy(debitTxns, (t) => t.amount)
    
    // Fixed bills (Rent, Spotify) are excluded from discretionary spend
    const fixedDaySpend = sumBy(debitTxns.filter((t) => t.isFixedBill), (t) => t.amount)
    const discretionarySpend = totalDaySpend - fixedDaySpend

    const dateStr = d <= 29 ? `Oct ${d + 2}` : `Nov ${d - 29}`
    const dayOfWeek = dayOfWeekMap[(d - 1) % 7]

    // Forecasted amounts for future days
    let forecastedSpend = 0
    if (d > CURRENT_DAY) {
      if (d === 9) forecastedSpend = 500 // Gym bill
      else if (d === 10) forecastedSpend = 65 // Netflix
      else if (d === 13) forecastedSpend = 380 // Electricity
      else if (d === 18) forecastedSpend = 299 // Jio
      else if (d === 26) forecastedSpend = 596 // Internet
    }

    days.push({
      dayNumber: d,
      dateStr,
      dayOfWeek,
      totalSpend: d <= CURRENT_DAY ? totalDaySpend : forecastedSpend,
      discretionarySpend: d <= CURRENT_DAY ? discretionarySpend : 0,
      fixedSpend: d <= CURRENT_DAY ? fixedDaySpend : forecastedSpend,
      hasBillDue: billsByDay[d],
      hasIncome: hasCredit,
      hasEvent: d === CURRENT_DAY,
      isToday: d === CURRENT_DAY,
      isFuture: d > CURRENT_DAY,
      transactions: dayTxns.map((t) => ({
        description: t.description,
        amount: t.amount,
        category: t.category,
        isExpensive: t.isExpensive,
        isAutoSynced: t.isAutoSynced,
        isFixedBill: t.isFixedBill,
      })),
    })
  }

  return days
}

export const calendarDays = getCalendarDays()

/* ── DISCRETIONARY EXPENSE STATS (EXCLUDING FIXED BILLS) ── */

export function getDiscretionaryStats(multiplier = 1.5) {
  const pastDays = calendarDays.filter((d) => !d.isFuture)
  const threshold = calculatedDailyAllowance * multiplier // e.g. 200 * 1.5 = 300

  // Expensive burn days ONLY count discretionary spending
  const expensiveDaysCount = pastDays.filter(
    (d) => d.discretionarySpend > threshold
  ).length

  const noSpendDaysCount = pastDays.filter((d) => d.totalSpend === 0).length

  // Biggest single purchase ONLY looks at discretionary transactions
  const discretionaryTxns = transactions.filter(
    (t) => t.type === 'debit' && !t.isFixedBill
  )

  let biggestPurchaseTxn = discretionaryTxns[0]
  for (const t of discretionaryTxns) {
    if (!biggestPurchaseTxn || t.amount > biggestPurchaseTxn.amount) {
      biggestPurchaseTxn = t
    }
  }

  return {
    expensiveDaysCount,
    noSpendDaysCount,
    biggestPurchase: biggestPurchaseTxn
      ? `${biggestPurchaseTxn.description} (₹${biggestPurchaseTxn.amount.toLocaleString('en-IN')})`
      : 'None',
    biggestPurchaseAmount: biggestPurchaseTxn?.amount || 0,
    biggestPurchaseDay: biggestPurchaseTxn?.date || 'Oct 9',
  }
}

/* ── FORECAST CHART DATA (ACTUAL VS DASHED PROJECTION) ── */

export const forecastData: ForecastPoint[] = [
  // Actual curve up to Day 8 (Oct 10)
  { day: 1,  label: 'Oct 3',  balance: 10000, actual: 10000 },
  { day: 3,  label: 'Oct 5',  balance: 9400,  actual: 9400 },
  { day: 5,  label: 'Oct 7',  balance: 8710,  actual: 8710 },
  { day: 8,  label: 'Oct 10', balance: 6240,  actual: 6240, projected: 6240 },
  // Projected curve from Day 8 onwards (dotted/dashed)
  { day: 11, label: 'Oct 13', balance: 5540,  projected: 5540 },
  { day: 15, label: 'Oct 17', balance: 4780,  projected: 4780 },
  { day: 19, label: 'Oct 21', balance: 3740,  projected: 3740 },
  { day: 23, label: 'Oct 25', balance: 2200,  projected: 2200, dangerZone: true },
  { day: 26, label: 'Oct 28', balance: 0,     projected: 0,    dangerZone: true },
  { day: 30, label: 'Nov 1',  balance: -320,  projected: -320, dangerZone: true },
]

/* ── HEALTH SCORE CRITERIA ────────────────────────────── */

export const healthReasons: HealthScoreReason[] = [
  { label: 'On-time bill payment record', points: 22, status: 'good' },
  { label: 'Budget category adherence', points: 20, status: 'good' },
  { label: 'Savings goal discipline', points: 16, status: 'good' },
  { label: 'Emergency cushion fund', points: 14, status: 'good' },
  { label: 'Discretionary spend limit', points: 12, status: 'good' },
  { label: 'Food budget overrun (Swiggy)', points: -8, status: 'bad' },
  { label: 'Forecast: dips into red on Oct 28 (Day 26)', points: -8, status: 'bad' },
]

/* ── INSIGHT CARDS ────────────────────────────────────── */

export const insights = [
  {
    id: 'ins-001',
    type: 'warning' as const,
    headline: 'Warning: Balance hits ₹0 on Oct 28 (Day 26)',
    body: 'At current spending velocity (₹310/day vs ₹200 daily allowance), you will run completely out of cash 4 days before month end.',
  },
  {
    id: 'ins-002',
    type: 'good' as const,
    headline: 'Transport is locked down',
    body: 'Only ₹480 spent on metro pass with 22 days left. You will comfortably finish the month with ₹120 transit surplus.',
  },
  {
    id: 'ins-003',
    type: 'tip' as const,
    headline: 'Food is 71% consumed on Oct 10 (Day 8)',
    body: '₹1,420 spent of ₹2,000 food budget. Limiting food spend to ₹26/day or skipping 1 food delivery protects Oct 28 (Day 26).',
  },
]

/* ── MONTH AUDIT SUMMARY (PART B DERIVED) ─────────────── */

export const monthSummary: MonthSummary = {
  grade: 'C+',
  totalSpent,
  totalSaved,
  startingBudget: STARTING_BUDGET,
  incomeTopUp: totalIncomeTopUp,
  projectedMonthEnd: -320,
  bestDay: 'Oct 7 (Day 5) — spent only ₹95, got ₹2,000 top-up',
  worstDay: 'Oct 9 (Day 7) — ₹1,007 spent (groceries + snacks)',
  wins: [
    'Rent ₹3,000 paid on Oct 4 without penalty',
    'Transport on track: ₹480 spent vs ₹600 budget',
    'Saved ₹1,900 across headphone & emergency goals',
    'Pocket money top-up of ₹2,000 recorded on Oct 7',
  ],
  mistakes: [
    'Weekly pantry run of ₹847 on Day 7 ate multiple days allowance',
    'Food category at 71% limit with 22 days to go',
    'Gym membership ₹500 due with low attendance',
  ],
  planVsActual: {
    planSpendDay8: 3200,
    actualSpendDay8: totalSpent,
    planBuffer: 1500,
    actualBuffer: 480,
  },
  shareTagline: 'Oct 10 (Day 8 of 30) on ₹10K. Balance: ₹6,240. Risk: Red by Oct 28 (Day 26). Survived so far.',
}
