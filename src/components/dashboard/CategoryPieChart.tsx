import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { categories } from '@/data/selectors'
import { formatCurrency } from '@/lib/format'

export default function CategoryPieChart() {
  return (
    <div className="h-[160px] flex items-center justify-center" aria-label="Category spend donut chart">
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
  )
}
