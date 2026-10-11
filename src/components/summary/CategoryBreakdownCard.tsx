import { PieChart as PieIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatCurrency } from '@/lib/format'
import type { CategorySpend } from '@/types/finance'

interface CategoryBreakdownCardProps {
  categories: CategorySpend[]
  totalSpent: number
}

export function CategoryBreakdownCard({
  categories,
  totalSpent,
}: CategoryBreakdownCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <PieIcon size={16} className="text-brand" />
          <h2 className="font-display font-[700] text-sm text-ink">Category Burn Breakdown</h2>
        </div>
        <span className="text-xs text-ink-muted font-mono">
          Total: {formatCurrency(totalSpent)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const pct = Math.round((cat.spent / cat.budget) * 100)
          const isRent = cat.name.toLowerCase().includes('rent')
          // Rent is a settled fixed bill on Oct 4, never danger
          const isOver = !isRent && pct >= 80

          return (
            <div key={cat.name} className="p-3.5 rounded-[12px] bg-surface border border-border">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-semibold text-xs text-ink">{cat.name}</span>
                  {isRent && (
                    <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-semibold bg-surface border border-border text-ink-muted">
                      Paid Fixed
                    </span>
                  )}
                </div>
                <span
                  className={`font-mono text-xs font-bold ${
                    isRent ? 'text-ink-muted' : isOver ? 'text-danger' : 'text-ink'
                  }`}
                >
                  {pct}%
                </span>
              </div>
              <Progress
                value={cat.spent}
                max={cat.budget}
                variant={isRent ? 'default' : isOver ? 'danger' : 'brand'}
                size="sm"
              />
              <div className="flex justify-between items-center text-[11px] text-ink-muted font-mono mt-2">
                <span>Spent: {formatCurrency(cat.spent)}</span>
                <span>Cap: {formatCurrency(cat.budget)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
