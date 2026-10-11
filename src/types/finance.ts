export type TransactionType = 'debit' | 'credit'

export type TransactionCategory =
  | 'Rent'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Utilities'
  | 'Health'
  | 'Education'
  | 'Income'
  | 'Other'

export interface Transaction {
  id: string
  description: string
  merchant: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  date: string // e.g. 'Oct 10', 'Today'
  dayNumber: number // 1 to 30
  time: string
  icon?: string
  isExpensive?: boolean
  isAutoSynced?: boolean
  isFixedBill?: boolean
}

export type BillStatus = 'paid' | 'due' | 'overdue'

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string // e.g. 'Oct 4'
  dayNumber: number // 1 to 30
  dueInDays: number
  status: BillStatus
  category: string
  icon: string
  autopay: boolean
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  category: string
  targetDate: string
  icon: string
  priority: 'high' | 'medium' | 'low'
  status: 'on-track' | 'at-risk' | 'paused'
  // Compatibility properties
  saved?: number
  target?: number
  deadline?: string
  color?: string
}

export interface EventChoice {
  label: string
  consequence: string
  impact: number
  tag?: string
}

export interface FinanceEvent {
  id: string
  title: string
  description: string
  amount: number
  severity: 'high' | 'medium' | 'low'
  choices: EventChoice[]
}

export interface ResolvedEventHistory {
  id: string
  title: string
  date: string
  dayNumber?: number
  choiceMade: string
  impact: number
  status: string
}

export type ConnectorStatus =
  | 'connected'
  | 'disconnected'
  | 'needs-reconnect'
  | 'needs_reconnect'
  | 'needs_attention'
  | 'not_connected'
  | 'coming_soon'
  | 'syncing'

export interface Connector {
  id: string
  name: string
  sourceType: 'sms' | 'upi' | 'bank_pdf' | 'email'
  status: ConnectorStatus
  lastSync: string
  itemsDetected: number
  description: string
  needsReconnect?: boolean
  autoAddBills?: boolean
  autoCategorise?: boolean
  monogram?: string
  type?: string
  importedThisMonth?: number
  lastSynced?: string
  category?: string
}

export interface ImportedItem {
  id: string
  merchant: string
  description: string
  amount: number
  date: string
  dayNumber: number
  category: string
  source: string
  isDuplicate?: boolean
}

export type SyncInboxItem = ImportedItem

export interface SyncLogEntry {
  id: string
  message: string
  timestamp: string
  type: 'success' | 'info' | 'warning'
}

export type SyncActivityLog = SyncLogEntry

export type RiskLevel = 'Safe' | 'Warning' | 'Danger' | 'Critical'

export interface ForecastPoint {
  day: number
  label: string
  balance: number
  projected?: number
  actual?: number
  dangerZone?: boolean
}

export interface CategorySpend {
  name: TransactionCategory
  spent: number
  budget: number
  color: string
}

export interface HealthScoreReason {
  label: string
  points: number
  status: 'good' | 'bad'
}

export interface CalendarDay {
  dayNumber: number
  dateStr: string
  dayOfWeek: string
  totalSpend: number
  discretionarySpend: number
  fixedSpend: number
  hasBillDue?: boolean
  hasIncome?: boolean
  hasEvent?: boolean
  isToday?: boolean
  isFuture: boolean
  transactions: Array<{
    description: string
    amount: number
    category: string
    isExpensive?: boolean
    isAutoSynced?: boolean
    isFixedBill?: boolean
  }>
}

export interface ScenarioResult {
  newBalance: number
  newAllowance: number
  simulatedDangerDay: number
  dangerDayShift: number
  riskLevel: RiskLevel
  newHealthScore: number
}

export interface HeroData {
  startingBalance: number
  incomeTopUp: number
  balance: number
  day: number
  totalDays: number
  daysLeft: number
  unpaidBills: number
  dailyAllowance: number
  yesterdaySpend: number
  projectedMonthEnd: number
  dangerDay: number
  riskLevel: RiskLevel
  healthScore: number
}

export interface MonthSummary {
  grade: string
  totalSpent: number
  totalSaved: number
  startingBudget: number
  incomeTopUp: number
  projectedMonthEnd: number
  bestDay: string
  worstDay: string
  wins: string[]
  mistakes: string[]
  planVsActual: {
    planSpendDay8: number
    actualSpendDay8: number
    planBuffer: number
    actualBuffer: number
  }
  shareTagline: string
}
