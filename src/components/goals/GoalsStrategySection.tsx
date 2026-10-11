import { Target, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function GoalsStrategySection() {
  const milestones = [
    { title: 'Emergency Cushion ₹1,000 (66%)', date: 'Expected Oct 16 (Day 14)' },
    { title: 'Headphones halfway mark (₹1,250)', date: 'Expected Oct 20 (Day 18)' },
    { title: 'Course fee buffer unlocked', date: 'Oct 28 (Day 26) clearance' },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-2">
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
              {milestones.map((m, i) => (
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
    </div>
  )
}
