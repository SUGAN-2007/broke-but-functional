import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface ChallengeParamsCardProps {
  budget: string
  onBudgetChange: (val: string) => void
  startDate: string
  onStartDateChange: (val: string) => void
}

export function ChallengeParamsCard({
  budget,
  onBudgetChange,
  startDate,
  onStartDateChange,
}: ChallengeParamsCardProps) {
  return (
    <Card className="p-5">
      <h2 className="font-display font-[700] text-sm text-ink mb-1">
        Challenge Core Parameters
      </h2>
      <p className="font-body text-xs text-ink-muted mb-4">
        Baseline budget and starting anchor for the 30-day challenge.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Starting Budget (₹)"
            type="number"
            value={budget}
            onChange={(e) => onBudgetChange(e.target.value)}
            min="1000"
            required
          />
          <p className="text-[11px] text-ink-muted mt-1">Default: ₹10,000 for standard run</p>
        </div>

        <div>
          <Input
            label="Challenge Start Date"
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            required
          />
          <p className="text-[11px] text-ink-muted mt-1">October 3 (runs through Nov 1)</p>
        </div>
      </div>
    </Card>
  )
}
