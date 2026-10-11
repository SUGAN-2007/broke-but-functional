import { Outlet } from 'react-router-dom'
import { SidebarRail, BottomNav } from './Navigation'
import { cn } from '@/lib/utils'

export function AppShell() {
  return (
    <div className="min-h-dvh bg-bg flex">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>

      {/* Desktop sidebar */}
      <SidebarRail />

      {/* Main content area */}
      <main
        id="main-content"
        className={cn(
          'flex-1 min-w-0',
          'lg:ml-[72px]',
          'pb-[calc(64px+env(safe-area-inset-bottom,0px))] lg:pb-0',
          'px-[var(--page-px)]',
          'py-[clamp(1.25rem,3vw,2.5rem)]'
        )}
      >
        <Outlet />
      </main>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  )
}
