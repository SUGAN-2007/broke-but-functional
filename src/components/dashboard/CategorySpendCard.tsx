import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { categories, totalSpent } from '@/data/selectors'
import { formatCurrency } from '@/lib/format'

const LazyCategoryPieChart = lazy(() => import('./CategoryPieChart'))

function CategoryPieChartSkeleton() {
  return (
    <div
      role="status"
      className="h-[160px] flex items-center justify-center"
      aria-label="Loading category donut chart"
    >
      <div className="w-[136px] h-[136px] rounded-full border-[18px] border-border/40 animate-pulse flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-border/20" />
      </div>
    </div>
  )
}

export function CategorySpendCard() {
  const [inView, setInView] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) return
    const el = containerRef.current
    if (!el || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView])

  return (
    <Card hover className="h-full flex flex-col p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-[700] text-sm text-ink">
          Category Spend ({formatCurrency(totalSpent)})
        </h2>
        <span className="font-mono text-xs text-ink-muted">8 Days</span>
      </div>

      <div ref={containerRef} className="h-[160px]">
        {inView ? (
          <Suspense fallback={<CategoryPieChartSkeleton />}>
            <LazyCategoryPieChart />
          </Suspense>
        ) : (
          <CategoryPieChartSkeleton />
        )}
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

