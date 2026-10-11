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

  const startPrefetch = () => {
    const queue = Object.keys(routeLoaders).filter((path) => path !== '/')
    let idx = 0

    const prefetchNext = () => {
      if (idx >= queue.length) return
      prefetchRoute(queue[idx++])
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(prefetchNext, { timeout: 2000 })
      } else {
        setTimeout(prefetchNext, 1200)
      }
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchNext, { timeout: 2000 })
    } else {
      setTimeout(prefetchNext, 1200)
    }
  }

  if (document.readyState === 'complete') {
    setTimeout(startPrefetch, 3000)
  } else {
    window.addEventListener('load', () => setTimeout(startPrefetch, 3000), { once: true })
  }
}
