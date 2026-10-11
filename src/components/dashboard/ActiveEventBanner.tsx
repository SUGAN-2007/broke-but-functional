import { Link } from 'react-router-dom'
import { Zap, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getDateForDay } from '@/lib/format'
import { DANGER_DAY } from '@/data/selectors'

export function ActiveEventBanner() {
  return (
    <div className="relative overflow-hidden rounded-[16px] bg-danger-bg border border-danger/30 p-3.5 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-[10px] bg-danger text-white dark:text-[#0B1511] flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <Zap size={18} aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-ink">
              Active Event: Phone screen cracked
            </span>
            <Badge variant="danger" className="text-[10px] py-0 px-1.5 uppercase font-bold">
              High Risk
            </Badge>
          </div>
          <p className="font-body text-xs text-ink-muted mt-0.5">
            Estimated repair: <span className="font-mono font-semibold text-danger">₹1,500</span>. Will pull your danger day from {getDateForDay(DANGER_DAY)} (Day {DANGER_DAY}) to {getDateForDay(23)} (Day 23).
          </p>
        </div>
      </div>
      <Link
        to="/events"
        className="self-stretch sm:self-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-danger hover:bg-danger/90 text-white dark:text-[#0B1511] font-display font-semibold text-xs tracking-wide transition-colors shadow-xs"
      >
        <span>Resolve Event</span>
        <ArrowUpRight size={14} />
      </Link>
    </div>
  )
}
