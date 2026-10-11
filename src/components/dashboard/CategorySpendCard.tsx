import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { Card } from '@/components/ui/card'
import { categories, totalSpent } from '@/data/selectors'
import { formatCurrency } from '@/lib/format'

export function CategorySpendCard() {
  return (
    <Card hover className="h-full flex flex-col p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-[700] text-sm text-ink">
          Category Spend ({formatCurrency(totalSpent)})
        </h2>
        <span className="font-mono text-xs text-ink-muted">8 Days</span>
      </div>

      <div className="h-[160px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="spent"
              nameKey="name"
              innerRadius={48}
              outerRadius={68}
              paddingAngle={3}
            >
              {categories.map((cat, i) => (
                <Cell key={i} fill={cat.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value) || 0), 'Spent']}
              contentStyle={{
                backgroundColor: 'var(--surface-raised)',
                borderColor: 'var(--border)',
                borderRadius: '10px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-2 flex-1 justify-center flex flex-col">
        {categories.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-ink font-medium">{cat.name}</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="font-semibold text-ink">{formatCurrency(cat.spent)}</span>
              <span className="text-[10px] text-ink-muted">/ {formatCurrency(cat.budget)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
