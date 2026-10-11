import { z } from 'zod'

export const CURRENT_SCHEMA_VERSION = 1

export const SettingsSchema = z.object({
  budget: z.number().min(1000).max(1000000).default(10000),
  startDate: z.string().default('2026-10-03'),
  purchaseThreshold: z.number().min(50).max(50000).default(500),
  dayMultiplier: z.enum(['1.25', '1.5', '2']).default('1.5'),
}).strict()

export type SettingsData = z.infer<typeof SettingsSchema>

export const ThemeSchema = z.enum(['light', 'dark', 'system']).default('system')
export type ThemeData = z.infer<typeof ThemeSchema>

export const TransactionSchema = z.object({
  id: z.string(),
  description: z.string(),
  merchant: z.string(),
  amount: z.number().nonnegative(),
  type: z.enum(['debit', 'credit']),
  category: z.enum([
    'Rent',
    'Food',
    'Transport',
    'Entertainment',
    'Utilities',
    'Health',
    'Education',
    'Income',
    'Other',
  ]),
  date: z.string(),
  dayNumber: z.number().int().min(1).max(30),
  time: z.string(),
  icon: z.string().optional(),
  isExpensive: z.boolean().optional(),
  isAutoSynced: z.boolean().optional(),
  isFixedBill: z.boolean().optional(),
}).strict()

export const BillSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.number().nonnegative(),
  dueDate: z.string(),
  dayNumber: z.number().int().min(1).max(30),
  dueInDays: z.number(),
  status: z.enum(['paid', 'due', 'overdue']),
  category: z.string(),
  icon: z.string(),
  autopay: z.boolean(),
}).strict()

export const GoalSchema = z.object({
  id: z.string(),
  name: z.string(),
  targetAmount: z.number().positive(),
  currentAmount: z.number().nonnegative(),
  category: z.string(),
  targetDate: z.string(),
  icon: z.string(),
  priority: z.enum(['high', 'medium', 'low']),
  status: z.enum(['on-track', 'at-risk', 'paused']),
  saved: z.number().optional(),
  target: z.number().optional(),
  deadline: z.string().optional(),
  color: z.string().optional(),
}).strict()

export const FinanceStateSchema = z.object({
  transactions: z.array(TransactionSchema),
  bills: z.array(BillSchema),
  goals: z.array(GoalSchema),
}).strict()

export type FinanceStateData = z.infer<typeof FinanceStateSchema>

export const ExportImportPayloadSchema = z.object({
  schemaVersion: z.number().int().min(1),
  settings: SettingsSchema,
  theme: ThemeSchema.optional(),
  financeState: FinanceStateSchema.optional(),
  timestamp: z.string().optional(),
  currentBalance: z.number().optional(),
}).strict()

export type ExportImportPayload = z.infer<typeof ExportImportPayloadSchema>
