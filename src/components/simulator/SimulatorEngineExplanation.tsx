import { Card } from '@/components/ui/card'
import { Calculator } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { getDateForDay } from '@/lib/format'

export function SimulatorEngineExplanation() {
  return (
    <Card className="p-5 h-full">
      <div className="flex items-center gap-2 mb-2">
        <Calculator size={16} className="text-brand" />
        <h2 className="font-display font-[700] text-sm text-ink">
          How the Simulator Computes Ripple Effects
        </h2>
      </div>
      <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
        A standard budgeting app only subtracts money. Broke But Functional recalculates the four core survival vectors:
      </p>

      <div className="space-y-3">
        <div className="flex items-start gap-2.5 text-xs">
          <span className="w-5 h-5 rounded-md bg-brand/10 text-brand flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
            1
          </span>
          <div>
            <span className="font-bold text-ink">Daily Allowance Recalibration: </span>
            <span className="text-ink-muted">
              Subsumes all unpaid committed bills (₹1,840) first before dividing remaining balance across 22 days.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <span className="w-5 h-5 rounded-md bg-accent/20 text-accent-fg flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
            2
          </span>
          <div>
            <span className="font-bold text-ink">Insolvency Day Acceleration: </span>
            <span className="text-ink-muted">
              Any single discretionary purchase &gt;₹1,000 immediately brings {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) forward by 3 days.
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5 text-xs">
          <span className="w-5 h-5 rounded-md bg-safe/10 text-safe flex items-center justify-center shrink-0 font-mono font-bold text-[11px]">
            3
          </span>
          <div>
            <span className="font-bold text-ink">Goal Protection Freeze: </span>
            <span className="text-ink-muted">
              Discretionary overruns automatically freeze goal sweep contributions to protect basic cash liquidity.
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
