import { Card, CardLabel } from '@/components/ui/card'
import { formatCurrency, getDateForDay } from '@/lib/format'
import type { MonthSummary, HeroData } from '@/types/finance'

interface SummaryMetricsGridProps {
  monthSummary: MonthSummary
  heroData: HeroData
}

export function SummaryMetricsGrid({ monthSummary, heroData }: SummaryMetricsGridProps) {
  return (
    <div className="md:col-span-8 grid grid-cols-2 gap-4">
      <Card className="p-4">
        <CardLabel>Total Outflow So Far</CardLabel>
        <p className="font-mono font-[700] text-2xl text-ink mt-1">
          {formatCurrency(monthSummary.totalSpent)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          of ₹{monthSummary.startingBudget.toLocaleString('en-IN')} (+₹2,000 top-up)
        </p>
      </Card>

      <Card className="p-4">
        <CardLabel>Goals & Stash Locked</CardLabel>
        <p className="font-mono font-[700] text-2xl text-safe mt-1">
          {formatCurrency(monthSummary.totalSaved)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">
          Headphones + Emergency cushion
        </p>
      </Card>

      <Card className="p-4">
        <CardLabel>Health Index</CardLabel>
        <p className="font-mono font-[700] text-2xl text-warning mt-1">
          {heroData.healthScore} <span className="text-xs text-ink-muted font-normal">/ 100</span>
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">Sum of all 7 weighted factors</p>
      </Card>

      <Card className="p-4 border-danger/30 bg-danger-bg/20">
        <CardLabel>Danger Point</CardLabel>
        <p className="font-mono font-[700] text-2xl text-danger mt-1">
          {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">Balance projected to reach ₹0</p>
      </Card>
    </div>
  )
}
