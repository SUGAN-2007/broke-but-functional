import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardSkeleton } from '@/components/ui/skeleton'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { initIdlePrefetch } from '@/lib/prefetch'

// Lazy-loaded pages
const Dashboard   = lazy(() => import('@/pages/Dashboard'))
const Calendar    = lazy(() => import('@/pages/Calendar'))
const Simulator   = lazy(() => import('@/pages/Simulator'))
const Commitments = lazy(() => import('@/pages/Commitments'))
const Goals       = lazy(() => import('@/pages/Goals'))
const Connect     = lazy(() => import('@/pages/Connect'))
const Events      = lazy(() => import('@/pages/Events'))
const Summary     = lazy(() => import('@/pages/Summary'))
const Settings    = lazy(() => import('@/pages/Settings'))
const NotFound    = lazy(() => import('@/pages/NotFound'))

function PageLoader() {
  return (
    <div className="flex flex-col gap-[var(--section-gap)]">
      <DashboardSkeleton />
    </div>
  )
}

function RouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

function DashboardRouteWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

function RouteTracker() {
  const location = useLocation()

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Dashboard — Broke But Functional',
      '/calendar': 'Survival Calendar (30 Days) — Broke But Functional',
      '/simulate': 'What-If Cashflow Simulator — Broke But Functional',
      '/commitments': 'Committed Bills & Subscriptions — Broke But Functional',
      '/goals': 'Savings Goals — Broke But Functional',
      '/connect': 'Simulated Bank & UPI Connectors — Broke But Functional',
      '/events': 'Surprise Financial Events — Broke But Functional',
      '/summary': '30-Day Retrospective & Summary — Broke But Functional',
      '/settings': 'Settings & Challenge Controls — Broke But Functional',
    }

    const title = titles[location.pathname] || 'Broke But Functional — Survive on ₹10K'
    document.title = title
  }, [location.pathname])

  useEffect(() => {
    initIdlePrefetch()
  }, [])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardRouteWrapper><Dashboard /></DashboardRouteWrapper>} />
          <Route path="/calendar" element={<RouteWrapper><Calendar /></RouteWrapper>} />
          <Route path="/simulate" element={<RouteWrapper><Simulator /></RouteWrapper>} />
          <Route path="/commitments" element={<RouteWrapper><Commitments /></RouteWrapper>} />
          <Route path="/goals" element={<RouteWrapper><Goals /></RouteWrapper>} />
          <Route path="/connect" element={<RouteWrapper><Connect /></RouteWrapper>} />
          <Route path="/events" element={<RouteWrapper><Events /></RouteWrapper>} />
          <Route path="/summary" element={<RouteWrapper><Summary /></RouteWrapper>} />
          <Route path="/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />
          <Route path="*" element={<RouteWrapper><NotFound /></RouteWrapper>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

