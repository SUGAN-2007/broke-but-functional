import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield, Laptop, Plane, GraduationCap, Plus,
} from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { goals } from '@/data/mock'
import { formatCurrency, formatPercent } from '@/lib/utils'
import type { Goal } from '@/data/mock'
import { fadeUp } from '@/lib/motion'

const ICONS: Record<string, React.ElementType> = {
  Shield,
  Laptop,
  Plane,
  GraduationCap,
}

function GoalCard({ goal }: { goal: Goal }) {
  const Icon = ICONS[goal.icon] ?? Shield
  const pct = formatPercent(goal.saved, goal.target)
  const remaining = goal.target - goal.saved
  const variant = pct >= 80 ? 'safe' : pct >= 40 ? 'brand' : 'warning'

  return (
    <Card hover className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0"
          style={{ background: `${goal.color}22` }}
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
        <h2 className="font-display font-[600] text-[1.0625rem] text-ink">{goal.name}</h2>
        <p className="font-body text-[0.8125rem] text-ink-muted mt-0.5">Target: {goal.deadline}</p>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <Progress
          value={goal.saved}
          max={goal.target}
          variant={variant}
          size="md"
          label={`${goal.name} progress: ${pct}%`}
          animated
        />
        <div className="flex justify-between">
          <div>
            <CardLabel>Saved</CardLabel>
            <p className="font-mono font-[600] text-[1rem] text-ink mt-0.5">{formatCurrency(goal.saved)}</p>
          </div>
          <div className="text-right">
            <CardLabel>Target</CardLabel>
            <p className="font-mono font-[600] text-[1rem] text-ink mt-0.5">{formatCurrency(goal.target)}</p>
          </div>
        </div>
        <p className="font-body text-[0.8125rem] text-ink-muted">
          {formatCurrency(remaining)} remaining
        </p>
      </div>

      <hr className="ledger-divider" />
      <Button variant="outline" size="sm" className="w-full">
        Contribute
      </Button>
    </Card>
  )
}

function AddGoalDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New savings goal</DialogTitle>
          <DialogDescription>
            What are you working towards? Break it down.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); onOpenChange(false) }}>
          <Input label="Goal name" placeholder="Goa trip, new headphones, emergency fund…" />
          <div className="flex gap-3">
            <div className="flex-1">
              <Input label="Target amount (₹)" type="number" placeholder="8000" />
            </div>
            <div className="flex-1">
              <Input label="Deadline" type="month" />
            </div>
          </div>
          <Input label="Starting contribution (₹)" type="number" placeholder="0" />
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1">Create goal</Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default function Goals() {
  const [addGoalOpen, setAddGoalOpen] = useState(false)
  const totalTarget = goals.reduce((s, g) => s + g.target, 0)
  const totalSaved  = goals.reduce((s, g) => s + g.saved, 0)

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-[var(--section-gap)]"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-[700] text-[clamp(1.75rem,3vw+1rem,2.75rem)] text-ink tracking-[-0.02em]">
            Savings Goals
          </h1>
          <p className="font-body text-ink-muted mt-1">
            {formatCurrency(totalSaved)} saved of {formatCurrency(totalTarget)} total target
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setAddGoalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} aria-hidden="true" />
          New goal
        </Button>
      </motion.div>

      {/* Goals grid */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--grid-gap)]"
      >
        {goals.map((goal) => (
          <motion.div key={goal.id} variants={fadeUp}>
            <GoalCard goal={goal} />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty state hint */}
      <motion.div variants={fadeUp}>
        <p className="font-body text-[0.8125rem] text-ink-muted text-center py-2">
          No subscriptions yet. Suspiciously disciplined.
        </p>
      </motion.div>

      <AddGoalDialog open={addGoalOpen} onOpenChange={setAddGoalOpen} />
    </motion.div>
  )
}
