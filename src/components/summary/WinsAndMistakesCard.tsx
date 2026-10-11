import { CheckCircle2, XCircle } from 'lucide-react'
import { Card, CardLabel } from '@/components/ui/card'
import type { MonthSummary } from '@/types/finance'

interface WinsAndMistakesCardProps {
  monthSummary: MonthSummary
}

export function WinsAndMistakesCard({ monthSummary }: WinsAndMistakesCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {/* Wins */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} className="text-safe" aria-hidden="true" />
            <h2 className="font-display font-[700] text-sm text-ink">Discipline Wins</h2>
          </div>
          <ul className="flex flex-col gap-2.5">
            {monthSummary.wins.map((win, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-safe-bg text-safe flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-body text-ink leading-relaxed">{win}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Mistakes */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle size={18} className="text-danger" aria-hidden="true" />
            <h2 className="font-display font-[700] text-sm text-ink">Runway Hazards & Slips</h2>
          </div>
          <ul className="flex flex-col gap-2.5">
            {monthSummary.mistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs">
                <span className="w-5 h-5 rounded-full bg-danger-bg text-danger flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-body text-ink leading-relaxed">{mistake}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Best & Toughest Day Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="p-4 border-safe/40 bg-safe-bg/20">
          <CardLabel className="text-safe">Best Survival Day</CardLabel>
          <p className="font-display font-bold text-sm text-ink mt-1">{monthSummary.bestDay}</p>
        </Card>
        <Card className="p-4 border-danger/40 bg-danger-bg/20">
          <CardLabel className="text-danger">Toughest Outflow Day</CardLabel>
          <p className="font-display font-bold text-sm text-ink mt-1">{monthSummary.worstDay}</p>
        </Card>
      </div>
    </div>
  )
}
