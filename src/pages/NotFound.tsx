import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60dvh] text-center gap-6 py-20 animate-in fade-in-50 duration-200"
    >
      {/* Receipt-style 404 */}
      <div className="w-full max-w-[280px] bg-surface-raised border border-border rounded-[20px] p-6 shadow-[var(--shadow-card)]">
        {/* Receipt header */}
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-ink-muted mb-3">
          BROKE BUT FUNCTIONAL
        </div>
        <hr className="ledger-divider" />
        <div className="py-4">
          <div className="font-display font-[800] text-[5rem] text-ink tracking-[-0.04em] leading-none">
            404
          </div>
          <div className="font-mono text-[0.875rem] text-ink-muted mt-2">
            PAGE NOT FOUND
          </div>
        </div>
        <hr className="ledger-divider" />
        <div className="font-body text-[0.8125rem] text-ink-muted pt-3 space-y-1">
          <div className="flex justify-between">
            <span>Status</span>
            <span className="font-mono text-danger font-[600]">LOST</span>
          </div>
          <div className="flex justify-between">
            <span>Budget impact</span>
            <span className="font-mono text-ink font-[600]">₹0</span>
          </div>
        </div>
        {/* Receipt tear */}
        <div className="mt-4 border-t-2 border-dashed border-border pt-3">
          <div className="font-mono text-[0.625rem] text-ink-muted uppercase tracking-[0.1em]">
            This page doesn't exist
          </div>
        </div>
      </div>

      <p className="font-body text-ink-muted max-w-[40ch]">
        Whatever you were looking for, it's not here. And unlike your Swiggy order, we can't track it down.
      </p>

      <div className="flex gap-3">
        <Button asChild variant="primary">
          <Link to="/">
            <Home size={16} aria-hidden="true" />
            Go home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft size={16} aria-hidden="true" />
          Go back
        </Button>
      </div>
    </div>
  )
}
