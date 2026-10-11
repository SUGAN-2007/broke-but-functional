import { Card } from '@/components/ui/card'
import { heroData, healthReasons } from '@/data/selectors'
import { getDateForDay } from '@/lib/format'

function HealthRing({ score }: { score: number }) {
  const r = 28
  const c = 2 * Math.PI * r
  const offset = c - (score / 100) * c

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
        <circle
          cx="36"
          cy="36"
          r={r}
          stroke="var(--border)"
          strokeWidth="6"
          fill="none"
        />
        <circle
          cx="36"
          cy="36"
          r={r}
          stroke="var(--warning)"
          strokeWidth="6"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-[700] text-sm text-ink leading-none">{score}</span>
        <span className="text-[8px] text-ink-muted leading-none mt-0.5">/100</span>
      </div>
    </div>
  )
}

export function HealthScoreCard() {
  return (
    <Card hover className="h-full flex flex-col p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-[700] text-sm text-ink">Financial Health Index</h2>
        <span className="font-mono text-xs text-ink-muted">Sum = {heroData.healthScore}</span>
      </div>

      <div className="flex items-center gap-4 py-1">
        <HealthRing score={heroData.healthScore} />
        <div className="flex-1">
          <p className="font-display font-semibold text-xs text-ink">Needs Intervention</p>
          <p className="font-body text-[11px] text-ink-muted mt-0.5">
            Overrun on food delivery threatens {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) insolvency.
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5 flex-1 justify-center">
        {healthReasons.map((r, i) => (
          <div key={i} className="flex items-center justify-between gap-2 text-xs">
            <span className="font-body text-[11px] text-ink-muted truncate">{r.label}</span>
            <span
              className={[
                'font-mono text-[11px] font-bold shrink-0',
                r.status === 'good' ? 'text-safe' : 'text-danger',
              ].join(' ')}
            >
              {r.points > 0 ? `+${r.points}` : r.points}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
