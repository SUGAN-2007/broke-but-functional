import { Card, CardLabel } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/format'

interface GoalsSummaryCardsProps {
  totalSaved: number
  totalTarget: number
  overallProgress: number
}

export function GoalsSummaryCards({
  totalSaved,
  totalTarget,
  overallProgress,
}: GoalsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card className="p-4">
        <CardLabel>Total Stashed</CardLabel>
        <p className="font-mono font-[700] text-2xl text-ink mt-1">
          {formatCurrency(totalSaved)}
        </p>
        <p className="font-body text-xs text-ink-muted mt-0.5">Safeguarded from daily impulse spending</p>
      </Card>

      <Card className="p-4">
        <CardLabel>Overall Challenge Progress</CardLabel>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-mono font-[700] text-2xl text-brand">{overallProgress}%</span>
          <span className="text-xs text-ink-muted">of {formatCurrency(totalTarget)} goal</span>
        </div>
        <Progress value={totalSaved} max={totalTarget} variant="brand" size="sm" className="mt-2" />
      </Card>

      <Card className="p-4 border-safe/40 bg-safe-bg/20">
        <CardLabel>Safety Cushion</CardLabel>
        <p className="font-mono font-[700] text-2xl text-safe mt-1">₹500 / ₹1,500</p>
        <p className="font-body text-xs text-ink-muted mt-0.5">Guarantees 2.5 emergency days at ₹200/day</p>
      </Card>
    </div>
  )
}
