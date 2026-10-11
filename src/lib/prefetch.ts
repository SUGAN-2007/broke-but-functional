export const routeLoaders: Record<string, () => Promise<unknown>> = {
  '/': () => import('@/pages/Dashboard'),
  '/calendar': () => import('@/pages/Calendar'),
  '/simulate': () => import('@/pages/Simulator'),
  '/commitments': () => import('@/pages/Commitments'),
  '/goals': () => import('@/pages/Goals'),
  '/connect': () => import('@/pages/Connect'),
  '/events': () => import('@/pages/Events'),
  '/summary': () => import('@/pages/Summary'),
  '/settings': () => import('@/pages/Settings'),
}

const prefetched = new Set<string>()

export function prefetchRoute(path: string): void {
  if (prefetched.has(path)) return
  const loader = routeLoaders[path]
  if (loader) {
    prefetched.add(path)
    loader().catch(() => {})
  }
}

/**
 * Prefetch all lazy routes when browser reaches idle state
 */
export function initIdlePrefetch(): void {
  if (typeof window === 'undefined') return

  const prefetchRemaining = () => {
    Object.keys(routeLoaders).forEach((path) => {
      prefetchRoute(path)
    })
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchRemaining, { timeout: 4000 })
  } else {
    setTimeout(prefetchRemaining, 2500)
  }
}
