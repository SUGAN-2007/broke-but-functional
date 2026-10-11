import {
  Shield,
  Laptop,
  Plane,
  GraduationCap,
  Headphones,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercent } from '@/lib/format'
import type { Goal } from '@/types/finance'

const ICONS: Record<string, React.ElementType> = {
  Shield,
  Laptop,
  Plane,
  GraduationCap,
  Headphones,
}

interface GoalCardProps {
  goal: Goal
  onContribute: (goal: Goal) => void
}

export function GoalCard({ goal, onContribute }: GoalCardProps) {
  const Icon = ICONS[goal.icon] ?? Shield
  const saved = goal.currentAmount ?? goal.saved ?? 0
  const target = goal.targetAmount ?? goal.target ?? 1
  const deadline = goal.targetDate ?? goal.deadline ?? 'Oct 30'
  const goalColor = goal.color ?? 'var(--brand)'
  const pct = formatPercent(saved, target)
  const remaining = target - saved
  const variant = pct >= 80 ? 'safe' : pct >= 30 ? 'brand' : 'warning'

  return (
    <Card hover className="flex flex-col justify-between gap-4 h-full p-5">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
            aria-hidden="true"
          >
            <Icon size={20} style={{ color: goalColor }} />
          </div>
          <Badge variant={variant === 'brand' ? 'brand' : variant === 'safe' ? 'safe' : 'warning'}>
            {pct}%
          </Badge>
        </div>

        {/* Name + deadline */}
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">{goal.name}</h2>
          <p className="font-body text-xs text-ink-muted mt-0.5">Target: {deadline}</p>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2 mt-4">
          <Progress
            value={saved}
            max={target}
            variant={variant}
            size="md"
            label={`${goal.name} progress: ${pct}%`}
            animated
          />
          <div className="flex justify-between items-baseline pt-1">
            <div>
              <CardLabel>Saved</CardLabel>
              <p className="font-mono font-bold text-sm text-ink mt-0.5">
                {formatCurrency(saved)}
              </p>
            </div>
            <div className="text-right">
              <CardLabel>Target</CardLabel>
              <p className="font-mono font-bold text-sm text-ink mt-0.5">
                {formatCurrency(target)}
              </p>
            </div>
          </div>
          <p className="font-body text-xs text-ink-muted mt-1">
            <span className="font-mono font-semibold text-brand">{formatCurrency(remaining)}</span> remaining
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-semibold"
          onClick={() => onContribute(goal)}
        >
          + Contribute
        </Button>
      </div>
    </Card>
  )
}
