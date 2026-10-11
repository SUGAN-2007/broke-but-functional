import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardSkeleton } from '@/components/ui/skeleton'

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<PageLoader />}>
                <Calendar />
              </Suspense>
            }
          />
          <Route
            path="/simulate"
            element={
              <Suspense fallback={<PageLoader />}>
                <Simulator />
              </Suspense>
            }
          />
          <Route
            path="/commitments"
            element={
              <Suspense fallback={<PageLoader />}>
                <Commitments />
              </Suspense>
            }
          />
          <Route
            path="/goals"
            element={
              <Suspense fallback={<PageLoader />}>
                <Goals />
              </Suspense>
            }
          />
          <Route
            path="/connect"
            element={
              <Suspense fallback={<PageLoader />}>
                <Connect />
              </Suspense>
            }
          />
          <Route
            path="/events"
            element={
              <Suspense fallback={<PageLoader />}>
                <Events />
              </Suspense>
            }
          />
          <Route
            path="/summary"
            element={
              <Suspense fallback={<PageLoader />}>
                <Summary />
              </Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <Suspense fallback={<PageLoader />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
