import { describe, it, expect } from 'vitest'
import {
  totalSpent,
  heroData,
  categories,
  sumBy,
  groupByCategory,
} from './selectors'
import { transactions } from './transactions'

describe('Finance Selectors & Mock Data Invariants', () => {
  it('calculates total spent from transactions to exactly ₹5,760', () => {
    const rawTotal = sumBy(
      transactions.filter((t) => t.type === 'debit'),
      (t) => t.amount
    )
    expect(rawTotal).toBe(5760)
    expect(totalSpent).toBe(5760)
  })

  it('calculates heroData liquid balance to ₹6,240 (10,000 + 2,000 - 5,760)', () => {
    expect(heroData.startingBalance).toBe(10000)
    expect(heroData.incomeTopUp).toBe(2000)
    expect(heroData.balance).toBe(6240)
  })

  it('verifies category breakdown sums correctly', () => {
    const categoryTotals = groupByCategory(transactions)
    const sumCategories = categories.reduce((sum, c) => sum + c.spent, 0)
    expect(sumCategories).toBe(5760)
    expect(categoryTotals['Food']).toBeDefined()
  })
})
