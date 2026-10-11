import { Sliders } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface AlertSensitivityCardProps {
  purchaseThreshold: string
  onPurchaseThresholdChange: (val: string) => void
  dayMultiplier: '1.25' | '1.5' | '2'
  onDayMultiplierChange: (val: '1.25' | '1.5' | '2') => void
  dailyAllowance: number
}

export function AlertSensitivityCard({
  purchaseThreshold,
  onPurchaseThresholdChange,
  dayMultiplier,
  onDayMultiplierChange,
  dailyAllowance,
}: AlertSensitivityCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-1">
        <Sliders size={16} className="text-accent" />
        <h2 className="font-display font-[700] text-sm text-ink">
          Expensive Alert Sensitivity
        </h2>
      </div>
      <p className="font-body text-xs text-ink-muted mb-4">
        Defines what triggers red heatmap tags on the Calendar and transaction lists.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Per-Purchase Threshold (₹)"
            type="number"
            value={purchaseThreshold}
            onChange={(e) => onPurchaseThresholdChange(e.target.value)}
            min="100"
            required
          />
          <p className="text-[11px] text-ink-muted mt-1">
            Single expenses above this amount receive the "Expensive" pill badge.
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
            Daily Burn Multiplier ({dayMultiplier}x Allowance)
          </label>
          <div className="flex items-center bg-surface border border-border rounded-[12px] p-1 h-10">
            {(['1.25', '1.5', '2'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onDayMultiplierChange(m)}
                className={[
                  'flex-1 py-1.5 rounded-[8px] text-xs font-mono font-bold transition-colors cursor-pointer',
                  dayMultiplier === m ? 'bg-brand text-brand-fg shadow-xs' : 'text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {m}x (₹{Math.round(dailyAllowance * parseFloat(m))})
              </button>
            ))}
          </div>
          <p className="text-[11px] text-ink-muted mt-1">
            Multiplied against your daily allowance (₹{dailyAllowance}/day).
          </p>
        </div>
      </div>
    </Card>
  )
}
