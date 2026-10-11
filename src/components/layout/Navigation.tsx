import { useState } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Calendar,
  GitBranch,
  Receipt,
  Target,
  PlugZap,
  Zap,
  BarChart3,
  Settings,
  MoreHorizontal,
  X,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  to: string
  icon: React.ElementType
  label: string
}

export const navItems: NavItem[] = [
  { to: '/',            icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/calendar',    icon: Calendar,        label: 'Calendar' },
  { to: '/simulate',    icon: GitBranch,       label: 'Simulator' },
  { to: '/commitments', icon: Receipt,         label: 'Bills' },
  { to: '/goals',       icon: Target,          label: 'Goals' },
  { to: '/connect',     icon: PlugZap,         label: 'Connect' },
  { to: '/events',      icon: Zap,             label: 'Events' },
  { to: '/summary',     icon: BarChart3,       label: 'Summary' },
  { to: '/settings',    icon: Settings,        label: 'Settings' },
]

/* ── Desktop Sidebar Rail ────────────────────────────── */
export function SidebarRail() {
  const location = useLocation()

  return (
    <aside
      aria-label="Main navigation"
      className={cn(
        'hidden lg:flex flex-col items-center',
        'fixed left-0 top-0 h-dvh w-[72px] z-40',
        'bg-surface border-r border-border',
        'py-3 gap-1 select-none overflow-y-auto no-scrollbar'
      )}
    >
      {/* Brand logo */}
      <Link
        to="/"
        className="mb-2 flex items-center justify-center group focus-visible:outline-none shrink-0"
        aria-label="Broke But Functional - Home"
      >
        <div className="w-10 h-10 rounded-[12px] bg-brand text-brand-fg flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
          <span className="font-display font-[800] text-[1.15rem] tracking-[-0.04em]">B</span>
        </div>
      </Link>

      {/* Direct Navbar Items (All 9 items directly on the rail) */}
      <nav className="flex flex-col items-center gap-1 w-full px-2" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)

          return (
            <div key={item.to} className="relative group w-full flex justify-center">
              <NavLink
                to={item.to}
                aria-label={item.label}
                className={cn(
                  'flex items-center justify-center',
                  'w-[44px] h-[44px] rounded-[12px]',
                  'transition-all duration-150',
                  'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
                  isActive
                    ? 'bg-brand text-brand-fg shadow-xs'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
                )}
              >
                <item.icon size={19} aria-hidden="true" strokeWidth={isActive ? 2.25 : 1.75} />
              </NavLink>

              {/* Tooltip / hover label */}
              <div
                role="tooltip"
                className="absolute left-[56px] top-1/2 -translate-y-1/2 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-ink text-surface text-xs font-semibold py-1 px-2.5 rounded-[8px] whitespace-nowrap shadow-md"
              >
                {item.label}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="mt-auto" />
    </aside>
  )
}

/* ── Mobile Bottom Nav ───────────────────────────────── */
export function BottomNav() {
  const location = useLocation()
  const [moreSheetOpen, setMoreSheetOpen] = useState(false)

  // 5 mobile items: Home, Calendar, Simulate (center), Goals, More
  const mobilePrimary = [
    { to: '/',         icon: LayoutDashboard, label: 'Home' },
    { to: '/calendar', icon: Calendar,        label: 'Calendar' },
    { to: '/simulate', icon: GitBranch,       label: 'Simulate', isCenter: true },
    { to: '/goals',    icon: Target,          label: 'Goals' },
  ]

  const isMoreActive = [
    '/commitments',
    '/connect',
    '/events',
    '/summary',
    '/settings',
  ].some((path) => location.pathname.startsWith(path))

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40',
          'flex lg:hidden items-center justify-around',
          'h-[64px] bg-surface/95 backdrop-blur-md border-t border-border',
          'px-3',
          'pb-[env(safe-area-inset-bottom,0px)]'
        )}
      >
        {mobilePrimary.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)

          if (item.isCenter) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={cn(
                  'flex flex-col items-center justify-center',
                  '-mt-5 w-[52px] h-[52px] rounded-full',
                  'bg-accent text-accent-fg shadow-[var(--shadow-raised)]',
                  'transition-transform duration-150 active:scale-95',
                  'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none'
                )}
              >
                <Plus size={22} aria-hidden="true" strokeWidth={2.5} />
                <span className="sr-only">{item.label}</span>
              </NavLink>
            )
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center justify-center gap-1',
                'min-w-[48px] min-h-[44px] rounded-[10px] px-2 py-1',
                'transition-colors duration-150',
                'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
                isActive ? 'text-brand font-semibold' : 'text-ink-muted'
              )}
            >
              <item.icon
                size={19}
                aria-hidden="true"
                strokeWidth={isActive ? 2.5 : 1.75}
              />
              <span className="text-[10px] uppercase font-bold tracking-wider">
                {item.label}
              </span>
            </NavLink>
          )
        })}

        {/* More Button */}
        <button
          type="button"
          onClick={() => setMoreSheetOpen(true)}
          className={cn(
            'flex flex-col items-center justify-center gap-1',
            'min-w-[48px] min-h-[44px] rounded-[10px] px-2 py-1',
            'transition-colors duration-150 cursor-pointer',
            'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
            isMoreActive ? 'text-brand font-semibold' : 'text-ink-muted'
          )}
          aria-label="Open more menu"
        >
          <MoreHorizontal size={19} aria-hidden="true" strokeWidth={isMoreActive ? 2.5 : 1.75} />
          <span className="text-[10px] uppercase font-bold tracking-wider">
            More
          </span>
        </button>
      </nav>

      {/* More Bottom Sheet on Mobile */}
      {moreSheetOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden bg-ink/40 backdrop-blur-xs animate-in fade-in"
          onClick={() => setMoreSheetOpen(false)}
        >
          <div
            className="bg-surface-raised border-t border-border rounded-t-[24px] p-5 pb-8 shadow-xl animate-in slide-in-from-bottom"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="More navigation options"
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
              <span className="font-display font-bold text-sm text-ink">More Pages</span>
              <button
                onClick={() => setMoreSheetOpen(false)}
                className="p-1 rounded-md text-ink-muted hover:text-ink cursor-pointer"
                aria-label="Close sheet"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { to: '/commitments', icon: Receipt, label: 'Bills & Dues' },
                { to: '/connect',     icon: PlugZap, label: 'Connectors' },
                { to: '/events',      icon: Zap,     label: 'Events' },
                { to: '/summary',     icon: BarChart3, label: 'Month Summary' },
                { to: '/settings',    icon: Settings, label: 'Settings' },
              ].map((item) => {
                const isActive = location.pathname.startsWith(item.to)
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMoreSheetOpen(false)}
                    className={cn(
                      'flex items-center gap-2.5 p-3 rounded-[12px] border text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-brand text-brand-fg border-brand'
                        : 'bg-surface border-border text-ink hover:bg-surface-raised'
                    )}
                  >
                    <item.icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
