import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Laptop,
  Plane,
  GraduationCap,
  Plus,
  Sparkles,
  Target,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { goals } from '@/data/mock'
import { formatCurrency, formatPercent } from '@/lib/utils'
import type { Goal } from '@/data/mock'
import { fadeUp } from '@/lib/motion'
import { AddGoalDialog, ContributeGoalDialog } from '@/components/dialogs/FinanceDialogs'

const ICONS: Record<string, React.ElementType> = {
  Shield,
  Laptop,
  Plane,
  GraduationCap,
}

function GoalCard({
  goal,
  onContribute,
}: {
  goal: Goal
  onContribute: (goal: Goal) => void
}) {
  const Icon = ICONS[goal.icon] ?? Shield
  const pct = formatPercent(goal.saved, goal.target)
  const remaining = goal.target - goal.saved
  const variant = pct >= 80 ? 'safe' : pct >= 30 ? 'brand' : 'warning'

  return (
    <Card hover className="flex flex-col justify-between gap-4 h-full p-5">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border"
            style={{
              background: `${goal.color}18`,
              borderColor: `${goal.color}40`,
            }}
            aria-hidden="true"
          >
            <Icon size={20} style={{ color: goal.color }} />
          </div>
          <Badge variant={variant === 'brand' ? 'brand' : variant === 'safe' ? 'safe' : 'warning'}>
            {pct}%
          </Badge>
        </div>

        {/* Name + deadline */}
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">{goal.name}</h2>
          <p className="font-body text-xs text-ink-muted mt-0.5">Target: {goal.deadline}</p>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col gap-2 mt-4">
          <Progress
            value={goal.saved}
            max={goal.target}
            variant={variant}
            size="md"
            label={`${goal.name} progress: ${pct}%`}
            animated
          />
          <div className="flex justify-between items-baseline pt-1">
            <div>
              <CardLabel>Saved</CardLabel>
              <p className="font-mono font-bold text-sm text-ink mt-0.5">
                {formatCurrency(goal.saved)}
              </p>
            </div>
            <div className="text-right">
              <CardLabel>Target</CardLabel>
              <p className="font-mono font-bold text-sm text-ink mt-0.5">
                {formatCurrency(goal.target)}
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

export default function Goals() {
  const [addGoalOpen, setAddGoalOpen] = useState(false)
  const [contributeTarget, setContributeTarget] = useState<Goal | null>(null)

  const totalSaved = goals.reduce((sum, g) => sum + g.saved, 0)
  const totalTarget = goals.reduce((sum, g) => sum + g.target, 0)
  const overallProgress = formatPercent(totalSaved, totalTarget)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
      </motion.div>

      {/* Target Highlights Strip */}
      <motion.div variants={fadeUp}>
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
              <span className="text-xs text-ink-muted">of ₹{totalTarget.toLocaleString('en-IN')} goal</span>
            </div>
            <Progress value={totalSaved} max={totalTarget} variant="brand" size="sm" className="mt-2" />
          </Card>

          <Card className="p-4 border-safe/40 bg-safe-bg/20">
            <CardLabel>Safety Cushion</CardLabel>
            <p className="font-mono font-[700] text-2xl text-safe mt-1">₹500 / ₹1,500</p>
            <p className="font-body text-xs text-ink-muted mt-0.5">Guarantees 2.5 emergency days at ₹200/day</p>
          </Card>
        </div>
      </motion.div>

      {/* Goals grid (4 cards) */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {goals.map((goal) => (
          <motion.div key={goal.id} variants={fadeUp}>
            <GoalCard goal={goal} onContribute={(g) => setContributeTarget(g)} />
          </motion.div>
        ))}
      </motion.div>

      {/* LOWER HALF FILL: STRATEGY & RUNWAY ALLOCATION */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2">
        {/* Left: Challenge Savings Rules (8 cols) */}
        <div className="lg:col-span-8">
          <Card className="p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-brand" />
                <h2 className="font-display font-[700] text-sm text-ink">
                  Survival Goal Allocation Protocol
                </h2>
              </div>
              <Badge variant="neutral" className="text-[10px]">Challenge Rulebook</Badge>
            </div>

            <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
              When living on ₹10,000 for 30 days, locking money in savings artificially lowers your daily allowance. Follow the tiered unlocking protocol:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-[12px] bg-surface border border-border">
                <span className="font-display font-bold text-xs text-brand block mb-1">
                  1. Emergency Cushion
                </span>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  First priority. Must reach ₹1,000 before contributing to headphones or trips.
                </p>
              </div>

              <div className="p-3.5 rounded-[12px] bg-surface border border-border">
                <span className="font-display font-bold text-xs text-accent block mb-1">
                  2. Daily Surplus Sweep
                </span>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  If today's spend stays under ₹200, 50% of the surplus sweeps into Headphones.
                </p>
              </div>

              <div className="p-3.5 rounded-[12px] bg-surface border border-border">
                <span className="font-display font-bold text-xs text-ink block mb-1">
                  3. The Oct 28 (Day 26) Guard
                </span>
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  Goal funds cannot be unlocked until Oct 28 (Day 26) is successfully passed without a deficit.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Milestone Tracker (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="p-5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-accent" />
                <h2 className="font-display font-[700] text-sm text-ink">Upcoming Milestones</h2>
              </div>
              <p className="font-body text-xs text-ink-muted mb-3">
                Key savings unlocks scheduled for this 30-day run.
              </p>

              <div className="flex flex-col gap-2.5">
                {[
                  { title: 'Emergency Cushion ₹1,000 (66%)', date: 'Expected Oct 16 (Day 14)', done: false },
                  { title: 'Headphones halfway mark (₹1,250)', date: 'Expected Oct 20 (Day 18)', done: false },
                  { title: 'Diwali ticket buffer unlocked', date: 'Oct 28 (Day 26) clearance', done: false },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <span className="w-4 h-4 rounded-full border border-border bg-surface flex items-center justify-center shrink-0 mt-0.5 text-[9px] text-ink-muted font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-ink text-xs">{m.title}</p>
                      <p className="text-[10px] text-ink-muted">{m.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <p className="font-body text-[11px] text-ink-muted italic text-center">
                Surplus sweeps happen at midnight on Oct 17 (Day 15) and Oct 27 (Day 25). Every ₹50 not spent on iced matcha protects your runway.
              </p>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Dialogs */}
      <AddGoalDialog open={addGoalOpen} onOpenChange={setAddGoalOpen} />
      {contributeTarget && (
        <ContributeGoalDialog
          open={!!contributeTarget}
          onOpenChange={(v) => !v && setContributeTarget(null)}
          goalName={contributeTarget.name}
          saved={contributeTarget.saved}
          target={contributeTarget.target}
        />
      )}
    </motion.div>
  )
}
