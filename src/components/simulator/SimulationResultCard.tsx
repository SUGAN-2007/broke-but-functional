import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, ArrowRight, Check } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { formatCurrency, getDateForDay } from '@/lib/format'
import type { RiskLevel } from '@/types/finance'

export interface SimulationResultCardProps {
  item: string
  amt: number
  newBalance: number
  newAllowance: number
  dangerDayShift: number
  simulatedDangerDay: number
  simulatedHealthScore: number
  beforeRisk: RiskLevel
  afterRisk: RiskLevel
  compareMode: boolean
  decisionConfirmed: boolean
  onConfirmDecision: () => void
  onCancel: () => void
}

export function SimulationResultCard({
  item,
  amt,
  newBalance,
  newAllowance,
  dangerDayShift,
  simulatedDangerDay,
  simulatedHealthScore,
  beforeRisk,
  afterRisk,
  compareMode,
  decisionConfirmed,
  onConfirmDecision,
  onCancel,
}: SimulationResultCardProps) {
  const isSevere = amt >= 1000 || simulatedDangerDay <= 23

  // Unified Risk Badges
  const riskColor = (r: RiskLevel) => {
    switch (r) {
      case 'Critical':
        return 'text-danger bg-danger-bg border-danger font-bold'
      case 'Danger':
        return 'text-danger bg-danger-bg/50 border-danger/40 font-semibold'
      case 'Warning':
        return 'text-warning bg-warning-bg border-warning/40 font-semibold'
      default:
        return 'text-safe bg-safe-bg border-safe/40 font-semibold'
    }
  }

  return (
    <Card className="p-5 h-full flex flex-col justify-between">
      <div>
        {/* Fixed Alert Title per requirement: 'Danger zone pulled forward' */}
        <div className="flex items-start gap-3 p-3.5 rounded-[12px] bg-danger-bg/30 border border-danger/40 mb-4">
          <AlertTriangle size={18} className="text-danger shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display font-bold text-sm text-ink">
                Danger zone pulled forward
              </h3>
              <Badge variant={isSevere ? 'danger' : 'warning'}>
                {afterRisk}
              </Badge>
            </div>
            <p className="font-body text-xs mt-1 text-ink-muted leading-relaxed">
              Spending <span className="font-bold font-mono text-ink">{formatCurrency(amt)}</span> on {item || 'this purchase'} pulls your ₹0 danger day forward by{' '}
              <span className="font-bold text-danger">{dangerDayShift} days</span> (from {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay}) to {getDateForDay(simulatedDangerDay)} (Day {simulatedDangerDay})). Daily allowance shrinks to{' '}
              <span className="font-bold text-danger">{formatCurrency(newAllowance)}/day</span>.
            </p>
          </div>
        </div>

        {/* Side-by-Side Comparison if Compare Mode Enabled */}
        {compareMode && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3.5 rounded-[12px] bg-danger-bg/20 border border-danger/30">
              <span className="text-[10px] font-bold text-danger uppercase tracking-wider block mb-1">
                Scenario A: Buy Now ({formatCurrency(amt)})
              </span>
              <p className="font-mono text-lg font-bold text-ink">{formatCurrency(newBalance)}</p>
              <p className="text-[11px] text-danger font-semibold mt-1">
                {formatCurrency(newAllowance)}/day • Danger: {getDateForDay(simulatedDangerDay)} (Day {simulatedDangerDay})
              </p>
              <p className="text-[10px] text-ink-muted mt-2">
                Headphones delayed. Month end deficit deepens.
              </p>
            </div>

            <div className="p-3.5 rounded-[12px] bg-safe-bg/20 border border-safe/30">
              <span className="text-[10px] font-bold text-safe uppercase tracking-wider block mb-1">
                Scenario B: Wait (₹0 now)
              </span>
              <p className="font-mono text-lg font-bold text-ink">{formatCurrency(heroData.balance)}</p>
              <p className="text-[11px] text-safe font-semibold mt-1">
                {formatCurrency(heroData.dailyAllowance)}/day • Danger: {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
              </p>
              <p className="text-[10px] text-ink-muted mt-2">
                Full daily runway preserved. Cushion remains intact.
              </p>
            </div>
          </div>
        )}

        {/* Delta Table */}
        <div className="divide-y divide-border/70 border-t border-b border-border py-1">
          {/* Liquid Balance */}
          <div className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-ink-muted font-body">Liquid Balance</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-ink-muted">{formatCurrency(heroData.balance)}</span>
              <ArrowRight size={12} className="text-border-strong" />
              <span className="font-bold text-danger">{formatCurrency(newBalance)}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-ink-muted">
                -{formatCurrency(amt)}
              </span>
            </div>
          </div>

          {/* Daily Allowance */}
          <div className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-ink-muted font-body">Daily Allowance</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-ink-muted">{formatCurrency(heroData.dailyAllowance)}/d</span>
              <ArrowRight size={12} className="text-border-strong" />
              <span className="font-bold text-danger">{formatCurrency(newAllowance)}/d</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-danger font-semibold">
                -{formatCurrency(heroData.dailyAllowance - newAllowance)}/d
              </span>
            </div>
          </div>

          {/* Insolvency Day */}
          <div className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-ink-muted font-body">Projected Insolvency Day</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-ink-muted">{getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})</span>
              <ArrowRight size={12} className="text-border-strong" />
              <span className="font-bold text-danger">{getDateForDay(simulatedDangerDay)} (Day {simulatedDangerDay})</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-danger-bg text-danger font-bold">
                {dangerDayShift}d earlier
              </span>
            </div>
          </div>

          {/* Unified Risk Scale Worsening */}
          <div className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-ink-muted font-body">Runway Risk Level</span>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className={`px-2 py-0.5 rounded border ${riskColor(beforeRisk)}`}>
                {beforeRisk}
              </span>
              <ArrowRight size={12} className="text-border-strong" />
              <span className={`px-2 py-0.5 rounded border ${riskColor(afterRisk)}`}>
                {afterRisk}
              </span>
            </div>
          </div>

          {/* Health Score shown strictly as "68 → 58" with NO rupee sign */}
          <div className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-ink-muted font-body">Health Score</span>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-ink-muted">{heroData.healthScore}</span>
              <ArrowRight size={12} className="text-border-strong" />
              <span className="font-bold text-danger">{simulatedHealthScore}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-ink-muted">
                {heroData.healthScore} → {simulatedHealthScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar: Solid Primary Confirm, Ghost Cancel */}
      <div className="pt-4 mt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-ink-muted font-body">
          {decisionConfirmed ? (
            <span className="text-safe font-semibold flex items-center gap-1">
              <Check size={14} /> Decision simulated and committed to active plan
            </span>
          ) : (
            <span>Commit this hypothetical simulation to your active runway view?</span>
          )}
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Ghost button for cancel */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="flex-1 sm:flex-none text-xs font-semibold"
          >
            Cancel
          </Button>
          {/* Solid primary button for confirm */}
          <Button
            variant="primary"
            size="sm"
            onClick={onConfirmDecision}
            className="flex-1 sm:flex-none text-xs font-semibold gap-1.5 shadow-sm"
          >
            <Check size={14} /> Confirm Decision
          </Button>
        </div>
      </div>
    </Card>
  )
}
