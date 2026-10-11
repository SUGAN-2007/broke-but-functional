import { Card } from '@/components/ui/card'
import { Input, Select } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'
import { quickScenarios, categoryOptions } from '@/data/scenarios'
import { formatCurrency } from '@/lib/format'

export interface SimulatorFormCardProps {
  item: string
  onItemChange: (v: string) => void
  amount: string
  onAmountChange: (v: string) => void
  category: string
  onCategoryChange: (v: string) => void
  date: string
  onDateChange: (v: string) => void
  onApplyScenario: (scenario: { label: string; amount: number; category: string }) => void
}

export function SimulatorFormCard({
  item,
  onItemChange,
  amount,
  onAmountChange,
  category,
  onCategoryChange,
  date,
  onDateChange,
  onApplyScenario,
}: SimulatorFormCardProps) {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Quick Scenario Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-ink-muted font-body font-medium flex items-center gap-1">
          <Sparkles size={13} className="text-accent" /> Quick Scenarios:
        </span>
        {quickScenarios.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => onApplyScenario(s)}
            className={[
              'px-2.5 py-1 rounded-[8px] text-xs font-semibold border transition-all cursor-pointer',
              item === s.label
                ? 'bg-ink text-surface border-ink'
                : 'bg-surface border-border text-ink hover:bg-surface-raised',
            ].join(' ')}
          >
            {s.label} <span className="font-mono text-ink-muted">({formatCurrency(s.amount)})</span>
          </button>
        ))}
      </div>

      <Card className="p-5 flex-1 flex flex-col justify-between">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
          <div>
            <h2 className="font-display font-[700] text-sm text-ink mb-1">
              Scenario Parameters
            </h2>
            <p className="text-xs text-ink-muted font-body">
              Configure purchase details to run the cashflow delta.
            </p>
          </div>

          <Input
            label="Item or Expense Description"
            placeholder="e.g. Swiggy dinner, Metro card..."
            value={item}
            onChange={(e) => onItemChange(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount (₹)"
              type="number"
              placeholder="1200"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              min="1"
              required
            />
            {/* Real select with a chevron styled cleanly */}
            <Select
              label="Category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              options={categoryOptions.map((c) => ({ value: c, label: c }))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
              Target Purchase Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full h-10 px-3 rounded-[12px] bg-surface border border-border text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </form>
      </Card>
    </div>
  )
}
