import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { goals } from '@/data'
import { sumBy } from '@/data/selectors'
import { formatCurrency, formatPercent } from '@/lib/format'
import type { Goal } from '@/types/finance'
import { AddGoalDialog, ContributeDialog } from '@/components/dialogs'
import { GoalCard } from '@/components/goals/GoalCard'
import { GoalsSummaryCards } from '@/components/goals/GoalsSummaryCards'
import { GoalsStrategySection } from '@/components/goals/GoalsStrategySection'

export default function Goals() {
  const [addGoalOpen, setAddGoalOpen] = useState(false)
  const [contributeTarget, setContributeTarget] = useState<Goal | null>(null)

  const totalSaved = sumBy(goals, (g) => g.currentAmount ?? g.saved ?? 0)
  const totalTarget = sumBy(goals, (g) => g.targetAmount ?? g.target ?? 0)
  const overallProgress = formatPercent(totalSaved, totalTarget)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Savings Goals & Cushions
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
            {formatCurrency(totalSaved)} locked away ({overallProgress}% towards total challenge target of {formatCurrency(totalTarget)}).
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setAddGoalOpen(true)}
          className="self-start sm:self-auto gap-1.5 text-xs font-semibold"
        >
          <Plus size={15} /> New Goal
        </Button>
      </div>

      {/* Target Highlights Strip */}
      <div>
        <GoalsSummaryCards
          totalSaved={totalSaved}
          totalTarget={totalTarget}
          overallProgress={overallProgress}
        />
      </div>

      {/* Goals grid (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((goal) => (
          <div key={goal.id}>
            <GoalCard goal={goal} onContribute={(g) => setContributeTarget(g)} />
          </div>
        ))}
      </div>

      {/* Lower Half: Strategy & Runway Allocation */}
      <div>
        <GoalsStrategySection />
      </div>

      {/* Dialogs */}
      <AddGoalDialog open={addGoalOpen} onOpenChange={setAddGoalOpen} />
      {contributeTarget && (
        <ContributeDialog
          open={!!contributeTarget}
          onOpenChange={(v) => !v && setContributeTarget(null)}
          goal={contributeTarget}
        />
      )}
    </div>
  )
}
