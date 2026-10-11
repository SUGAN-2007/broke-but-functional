import { Sliders } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { heroData } from '@/data/selectors'

export interface CalendarControlsBarProps {
  purchaseThreshold: string
  onPurchaseThresholdChange: (v: string) => void
  dayMultiplier: '1.25' | '1.5' | '2'
  onDayMultiplierChange: (v: '1.25' | '1.5' | '2') => void
}

export function CalendarControlsBar({
  purchaseThreshold,
  onPurchaseThresholdChange,
  dayMultiplier,
  onDayMultiplierChange,
}: CalendarControlsBarProps) {
  const mult = parseFloat(dayMultiplier)
  const expensiveDayLimit = Math.round(heroData.dailyAllowance * mult)

  return (
    <Card className="p-4 bg-surface border-border">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-2.5">
          <Sliders size={18} className="text-brand shrink-0 mt-0.5 sm:mt-0" />
          <div>
            <p className="font-display font-bold text-xs text-ink">What counts as expensive?</p>
            <p className="text-[11px] text-ink-muted font-body">
              Expensive day: spend &gt;{dayMultiplier}x daily allowance (₹{expensiveDayLimit}). Expensive purchase: single item &gt;₹{purchaseThreshold}.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-ink-muted">Single item threshold:</span>
            <div className="flex items-center bg-surface-raised border border-border rounded-[8px] px-2 py-1">
              <span className="text-xs font-mono font-bold text-ink">₹</span>
              <input
                type="number"
                value={purchaseThreshold}
                onChange={(e) => onPurchaseThresholdChange(e.target.value)}
                className="w-14 text-xs font-mono font-bold bg-transparent outline-none pl-1"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-ink-muted">Day multiplier:</span>
            <div className="flex items-center bg-surface-raised border border-border rounded-[8px] p-0.5">
              {(['1.25', '1.5', '2'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onDayMultiplierChange(m)}
                  className={[
                    'px-2 py-0.5 rounded-[6px] text-xs font-mono font-bold transition-colors cursor-pointer',
                    dayMultiplier === m ? 'bg-brand text-brand-fg' : 'text-ink-muted hover:text-ink',
                  ].join(' ')}
                >
                  {m}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
