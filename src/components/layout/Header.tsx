import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Sun,
  Moon,
  Bell,
  ChevronRight,
  AlertTriangle,
  CalendarDays,
  X,
} from 'lucide-react'
import { heroData } from '@/data/mock'
import { Badge } from '@/components/ui/badge'
import { getDateForDay } from '@/lib/utils'

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return false
  })
  const [showAlerts, setShowAlerts] = useState(false)
  const [dayOffset, setDayOffset] = useState(0)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  const currentDay = Math.min(heroData.totalDays, heroData.day + dayOffset)

  return (
    <header className="sticky top-0 z-30 w-full bg-surface/90 backdrop-blur-md border-b border-border transition-colors">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)] h-14 flex items-center justify-between gap-3">
        {/* Left: App title / breadcrumb on mobile, status chip */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 lg:hidden text-ink font-display font-[800] text-sm tracking-tight"
          >
            <span className="w-7 h-7 rounded-[8px] bg-brand text-brand-fg flex items-center justify-center text-xs font-bold">
              B
            </span>
            <span className="hidden xs:inline">Broke But Functional</span>
          </Link>

          {/* Current day / simulated day chip */}
          <div className="flex items-center bg-surface-raised border border-border rounded-[10px] pl-2.5 pr-1 py-1 shadow-xs">
            <CalendarDays size={14} className="text-brand mr-1.5 shrink-0" aria-hidden="true" />
            <span className="font-mono text-xs font-bold text-ink">
              {getDateForDay(currentDay)}
            </span>
            <span className="text-xs text-ink-muted font-body ml-1.5">
              (Day {currentDay} of {heroData.totalDays})
            </span>
            {dayOffset === 0 ? (
              <span className="hidden xs:inline-flex items-center ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-accent/20 text-accent">
                Today
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setDayOffset(0)}
                className="ml-1.5 px-1.5 py-0.5 rounded-[5px] text-[10px] font-semibold bg-accent/20 hover:bg-accent/30 text-accent transition-colors cursor-pointer"
                title="Reset back to current day (Oct 10, Day 8)"
                aria-label="Reset back to current day"
              >
                Today
              </button>
            )}
            <button
              type="button"
              onClick={() => setDayOffset((prev) => (prev >= 22 ? 0 : prev + 1))}
              className="ml-1.5 flex items-center gap-1 px-2 py-0.5 rounded-[6px] text-[10px] font-semibold bg-bg hover:bg-border text-ink-muted hover:text-ink transition-colors cursor-pointer"
              title="Simulate advancing to the next day"
              aria-label="Next day"
            >
              <span>Next day</span>
              <ChevronRight size={10} aria-hidden="true" />
            </button>
          </div>

          {/* Quick status pill */}
          <Badge variant="warning" className="hidden sm:inline-flex text-[11px] py-0.5 px-2">
            Danger on {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
          </Badge>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Alerts Bell */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAlerts((v) => !v)}
              className="relative p-2 rounded-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none cursor-pointer"
              aria-label="Notifications & active events"
              aria-expanded={showAlerts}
            >
              <Bell size={18} aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger ring-2 ring-surface" />
            </button>

            {/* Alerts Dropdown */}
            {showAlerts && (
              <div
                className="absolute right-0 mt-2 w-80 sm:w-88 bg-surface-raised border border-border rounded-[16px] shadow-[var(--shadow-raised)] p-3 z-50 animate-in fade-in-50 zoom-in-95"
                role="region"
                aria-label="Alerts popover"
              >
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle size={15} className="text-warning" />
                    <span className="font-display font-semibold text-xs text-ink">Urgent Alerts</span>
                  </div>
                  <button
                    onClick={() => setShowAlerts(false)}
                    className="p-1 text-ink-muted hover:text-ink rounded-md"
                    aria-label="Close alerts"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="py-2.5 flex flex-col gap-2">
                  <Link
                    to="/events"
                    onClick={() => setShowAlerts(false)}
                    className="p-2.5 rounded-[10px] bg-danger-bg/40 border border-danger/30 hover:bg-danger-bg transition-colors flex flex-col gap-1 text-left block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-xs text-danger">Active Event: Phone screen cracked</span>
                      <span className="font-mono text-[10px] text-danger font-bold">₹1,500</span>
                    </div>
                    <p className="text-[11px] text-ink-muted line-clamp-2">
                      Slipped on metro stairs. High severity event awaiting your decision.
                    </p>
                  </Link>

                  <Link
                    to="/commitments"
                    onClick={() => setShowAlerts(false)}
                    className="p-2 rounded-[10px] bg-warning-bg/40 border border-warning/30 hover:bg-warning-bg transition-colors flex flex-col gap-0.5 text-left block"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-xs text-warning">Gym Membership bill due tomorrow</span>
                      <span className="font-mono text-[10px] text-warning font-bold">₹500</span>
                    </div>
                    <p className="text-[11px] text-ink-muted">Due Oct 11. Overdue notice pending.</p>
                  </Link>
                </div>

                <div className="pt-2 border-t border-border flex justify-end">
                  <Link
                    to="/events"
                    onClick={() => setShowAlerts(false)}
                    className="text-[11px] font-semibold text-brand hover:underline"
                  >
                    View all events →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Dark/Light mode toggle */}
          <button
            type="button"
            onClick={() => setIsDark((d) => !d)}
            className="p-2 rounded-[10px] text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none cursor-pointer"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} className="text-accent" /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
