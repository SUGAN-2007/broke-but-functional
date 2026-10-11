import { Outlet } from 'react-router-dom'
import { SidebarRail, BottomNav } from './Navigation'
import { Header } from './Header'
import { cn } from '@/lib/utils'

export function AppShell() {
  return (
    <div className="min-h-dvh bg-bg text-ink flex flex-col antialiased selection:bg-brand selection:text-brand-fg">
      {/* Skip link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-brand-fg focus:rounded-[8px] focus:shadow-md"
      >
        Skip to main content
      </a>

      {/* Desktop sidebar rail */}
      <SidebarRail />

      {/* Main content wrapper */}
      <div className="flex-1 min-w-0 flex flex-col lg:ml-[72px]">
        {/* Top sticky header */}
        <Header />

        {/* Page body */}
        <main
          id="main-content"
          className={cn(
            'flex-1 min-w-0 w-full',
            'px-[var(--page-px)] py-5 sm:py-6',
            'pb-[calc(76px+env(safe-area-inset-bottom,0px))] lg:pb-10'
          )}
        >
          <div className="max-w-[1200px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <BottomNav />
    </div>
  )
}
