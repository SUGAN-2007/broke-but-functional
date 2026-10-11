import { Card } from '@/components/ui/card'
import { getDateForDay } from '@/lib/format'
import type { HeroData } from '@/types/finance'

interface PlanVsActualCardProps {
  heroData: HeroData
}

export function PlanVsActualCard({ heroData }: PlanVsActualCardProps) {
  const comparisonRows = [
    {
      metric: 'Budget Available',
      plan: '₹10,000 (flat)',
      actual: '₹12,000 (+₹2k top-up)',
      status: 'positive' as const,
      delta: '+₹2,000 inflow',
    },
    {
      metric: `${getDateForDay(8)} (Day 8) Cumulative Burn`,
      plan: '₹3,200 planned',
      actual: '₹5,760 actual',
      status: 'negative' as const,
      delta: 'Overrun by ₹2,560',
    },
    {
      metric: 'Daily Runway Left',
      plan: '₹309/day target',
      actual: '₹200/day actual',
      status: 'negative' as const,
      delta: '-₹109/day slower',
    },
    {
      metric: 'Insolvency Horizon',
      plan: `${getDateForDay(30)} (Day 30) • Surplus ₹1,500`,
      actual: `${getDateForDay(heroData.dangerDay)} (Day 26) • Deficit -₹320`,
      status: 'negative' as const,
      delta: '4 days cut short',
    },
  ]

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">
            Starting Plan vs Actual Outcome ({getDateForDay(8)} / Day 8 Reality Check)
          </h2>
          <p className="font-body text-xs text-ink-muted">
            How reality deviated from your {getDateForDay(1)} (Day 1) financial projections
          </p>
        </div>
        <span className="text-xs font-mono font-semibold text-warning">Variance: -₹2,560</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {comparisonRows.map((row, i) => (
          <div
            key={i}
            className="p-3.5 rounded-[12px] bg-surface border border-border flex flex-col justify-between"
          >
            <div>
              <span className="font-display font-bold text-xs text-ink block mb-2.5">
                {row.metric}
              </span>
              {/* Stack labels above values to eliminate text collisions */}
              <div className="text-xs space-y-2">
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-mono tracking-wide">
                    Plan
                  </span>
                  <span className="font-mono text-xs text-ink block mt-0.5">
                    {row.plan}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-ink-muted block uppercase font-mono tracking-wide">
                    Actual
                  </span>
                  <span
                    className={`font-mono text-xs font-bold block mt-0.5 ${
                      row.status === 'negative' ? 'text-danger' : 'text-safe'
                    }`}
                  >
                    {row.actual}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-border/60">
              <span
                className={`text-[10px] font-bold ${
                  row.status === 'negative' ? 'text-danger' : 'text-safe'
                }`}
              >
                {row.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
