import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { getDateForDay } from '@/lib/format'

const LazyForecastChart = lazy(() => import('./ForecastChart'))

function ForecastChartSkeleton() {
  return (
    <div
      role="status"
      className="w-full h-[220px] rounded-[10px] bg-border/20 border border-border/40 animate-pulse flex flex-col items-center justify-center gap-2"
      aria-label="Loading forecast chart"
    >
      <div className="w-16 h-1 bg-border/40 rounded-full" />
      <span className="font-mono text-xs text-ink-muted">Loading chart...</span>
    </div>
  )
}

export function ForecastChartCard() {
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
    <Card className="h-full flex flex-col p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">Balance & Danger Zone Forecast</h2>
          <p className="font-body text-xs text-ink-muted">
            Solid green indicates actual spend up to Oct 10; dashed red shows projected burn.
          </p>
        </div>
        <Badge variant="danger" className="self-start sm:self-auto font-bold text-xs">
          <AlertTriangle size={11} className="mr-1" />
          Red Zone: {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
        </Badge>
      </div>

      <div ref={containerRef} className="w-full flex-1 min-h-[220px]">
        {inView ? (
          <Suspense fallback={<ForecastChartSkeleton />}>
            <LazyForecastChart />
          </Suspense>
        ) : (
          <ForecastChartSkeleton />
        )}
      </div>

      {/* Visible Red Zone Legend */}
      <div className="mt-2 pt-2 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
        <div className="flex items-center gap-3.5">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-brand" /> Actual (Oct 3–10)
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-3 h-0.5 bg-danger border-b border-dashed border-danger" /> Projected (Oct 10–Nov 1)
          </span>
          {/* Visible Red Zone Tag */}
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-[5px] bg-danger-bg border border-danger/40 text-danger font-bold text-[11px]">
            <span className="w-2 h-2 rounded-[2px] bg-danger" />
            Red Zone (&lt;₹0 deficit)
          </span>
        </div>
        <Link to="/calendar" className="text-brand font-semibold hover:underline">
          View Calendar Grid →
        </Link>
      </div>
    </Card>
  )
}

