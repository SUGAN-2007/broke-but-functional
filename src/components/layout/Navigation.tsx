import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  GitBranch,
  Calendar,
  Target,
  Zap,
  BarChart3,
  Plus,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/',           icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/commitments',icon: Calendar,        label: 'Bills' },
  { to: '/simulate',   icon: GitBranch,       label: 'Simulate', isCenter: true },
  { to: '/goals',      icon: Target,          label: 'Goals' },
  { to: '/summary',    icon: BarChart3,       label: 'Summary' },
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
        'py-6 gap-1'
      )}
    >
      {/* Logo */}
      <div className="mb-6 flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-[12px] bg-brand flex items-center justify-center"
          aria-label="Broke But Functional"
        >
          <span className="font-display font-[800] text-brand-fg text-[1.1rem] tracking-[-0.04em]">B</span>
        </div>
      </div>

      <nav className="flex flex-col items-center gap-1 w-full px-2">
        {navItems.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to)

          return (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={item.label}
              className={cn(
                'relative flex items-center justify-center',
                'w-full h-[48px] rounded-[12px]',
                'transition-all duration-150',
                'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
                item.isCenter
                  ? 'bg-accent text-accent-fg hover:bg-accent-hover'
                  : isActive
                  ? 'bg-brand text-brand-fg'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
              )}
            >
              <item.icon size={20} aria-hidden="true" strokeWidth={isActive ? 2.5 : 1.75} />
              <span className="sr-only">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Events link at bottom */}
      <div className="mt-auto px-2 w-full">
        <NavLink
          to="/events"
          aria-label="Events"
          className={({ isActive }) => cn(
            'flex items-center justify-center',
            'w-full h-[48px] rounded-[12px]',
            'transition-all duration-150',
            'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
            isActive
              ? 'bg-brand text-brand-fg'
              : 'text-ink-muted hover:text-ink hover:bg-surface-raised'
          )}
        >
          <Zap size={20} aria-hidden="true" />
          <span className="sr-only">Events</span>
        </NavLink>
      </div>
    </aside>
  )
}

/* ── Mobile Bottom Nav ───────────────────────────────── */
export function BottomNav() {
  const location = useLocation()

  return (
    <nav
      aria-label="Mobile navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'flex lg:hidden items-center justify-around',
        'h-[64px] bg-surface border-t border-border',
        'px-2',
        'pb-[env(safe-area-inset-bottom,0px)]'
      )}
    >
      {navItems.map((item) => {
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
                '-mt-5 w-[56px] h-[56px] rounded-full',
                'bg-accent text-accent-fg shadow-[var(--shadow-raised)]',
                'transition-all duration-150 active:scale-95',
                'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none'
              )}
            >
              <Plus size={24} aria-hidden="true" />
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
              'min-w-[44px] min-h-[44px] rounded-[8px]',
              'transition-colors duration-150',
              'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
              isActive ? 'text-brand' : 'text-ink-muted'
            )}
          >
            <item.icon
              size={20}
              aria-hidden="true"
              strokeWidth={isActive ? 2.5 : 1.75}
            />
            <span className="text-[0.625rem] font-[600] uppercase tracking-wide">
              {item.label}
            </span>
          </NavLink>
        )
      })}

      {/* Events */}
      <NavLink
        to="/events"
        className={({ isActive }) => cn(
          'flex flex-col items-center justify-center gap-1',
          'min-w-[44px] min-h-[44px] rounded-[8px]',
          'transition-colors duration-150',
          'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
          isActive ? 'text-brand' : 'text-ink-muted'
        )}
      >
        <Zap size={20} aria-hidden="true" />
        <span className="text-[0.625rem] font-[600] uppercase tracking-wide">Events</span>
      </NavLink>
    </nav>
  )
}
