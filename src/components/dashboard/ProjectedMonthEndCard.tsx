import { Link } from 'react-router-dom'
import { Card, CardLabel, CardValue } from '@/components/ui/card'
import { TrendingDown, Lightbulb } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { formatCurrency, getDateForDay } from '@/lib/format'

export function ProjectedMonthEndCard() {
  return (
    <Card hover className="h-full flex flex-col justify-between p-5">
      <div>
        <CardLabel>Projected Month-End</CardLabel>
        <CardValue size="lg" className="mt-2 mb-1 text-danger font-mono font-bold">
          {formatCurrency(heroData.projectedMonthEnd)}
        </CardValue>
        <p className="font-body text-xs text-ink-muted">deficit at current burn velocity</p>

        {/* Tip filling the middle */}
        <div className="mt-3.5 pt-3 border-t border-border/80 p-2.5 rounded-[10px] bg-accent/10 border border-accent/20">
          <div className="flex items-start gap-2">
            <Lightbulb size={14} className="text-accent shrink-0 mt-0.5" />
            <p className="text-[11px] text-ink font-body leading-relaxed">
              <span className="font-semibold text-ink">Runway Tip: </span>
              Skipping 2 food deliveries moves Day 26 to Day 28.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-danger font-semibold">
          <TrendingDown size={14} aria-hidden="true" />
          <span>Hits ₹0 on {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})</span>
        </div>
        <Link to="/simulate" className="text-[11px] text-brand hover:underline font-semibold">
          Simulate cut →
        </Link>
      </div>
    </Card>
  )
}
