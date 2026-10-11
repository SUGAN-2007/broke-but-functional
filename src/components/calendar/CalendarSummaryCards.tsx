import { Card, CardLabel } from '@/components/ui/card'
import { getDiscretionaryStats } from '@/data/selectors'
import { formatCurrency } from '@/lib/format'

export interface CalendarSummaryCardsProps {
  dayMultiplier: '1.25' | '1.5' | '2'
}

export function CalendarSummaryCards({ dayMultiplier }: CalendarSummaryCardsProps) {
  const mult = parseFloat(dayMultiplier)
  const stats = getDiscretionaryStats(mult)
  const limit = Math.round(200 * mult)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4 border-danger/30 bg-danger-bg/20">
        <CardLabel className="text-danger">Discretionary Burn Days</CardLabel>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono font-[700] text-2xl text-danger">{stats.expensiveDaysCount} days</span>
          <span className="text-xs text-ink-muted">(&gt;₹{limit}/d)</span>
        </div>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          Excludes fixed rent & subscriptions. Only food, shopping & discretionary burn.
        </p>
      </Card>

      <Card className="p-4">
        <CardLabel>Biggest Discretionary Spend</CardLabel>
        <p className="font-mono font-[700] text-2xl text-ink mt-1">
          {formatCurrency(stats.biggestPurchaseAmount)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          {stats.biggestPurchase} on {stats.biggestPurchaseDay} (Rent excluded)
        </p>
      </Card>

      <Card className="p-4 border-safe/30 bg-safe-bg/20">
        <CardLabel className="text-safe">Zero-Spend Discipline Days</CardLabel>
        <p className="font-mono font-[700] text-2xl text-safe mt-1">{stats.noSpendDaysCount} days</p>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          Protected runway days with ₹0 discretionary drain.
        </p>
      </Card>
    </div>
  )
}
