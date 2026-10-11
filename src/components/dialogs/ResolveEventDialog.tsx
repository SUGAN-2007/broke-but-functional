import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export interface ResolveEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onResolved?: () => void
  title?: string
  amount?: number
}

export function ResolveEventDialog({
  open,
  onOpenChange,
  onResolved,
  title = 'Phone screen cracked',
  amount = 1500,
}: ResolveEventDialogProps) {
  const [selectedChoice, setSelectedChoice] = useState('pay')

  const handleConfirm = () => {
    onResolved?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-danger" />
            Resolve Incident: {title}
          </DialogTitle>
          <DialogDescription>
            Choose how to handle this unexpected event. Every decision affects your runway.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          {[
            {
              id: 'pay',
              label: `Pay now (₹${amount})`,
              desc: 'Immediate fix. Daily allowance drops to ₹131.',
              badge: 'Safe repair',
            },
            {
              id: 'defer',
              label: 'Defer 2 weeks (₹0 now)',
              desc: 'Use screen tape. Protect cash until Oct 24 (Day 22).',
              badge: 'Temporary',
            },
            {
              id: 'skip',
              label: 'Borrow backup phone (₹0)',
              desc: 'Use roommate spare phone. Zero financial cost.',
              badge: 'Frugal win',
            },
          ].map((c) => (
            <label
              key={c.id}
              onClick={() => setSelectedChoice(c.id)}
              className={[
                'p-3.5 rounded-[12px] border flex items-start gap-3 cursor-pointer transition-all',
                selectedChoice === c.id
                  ? 'border-brand bg-brand/5 shadow-xs'
                  : 'border-border bg-surface hover:bg-surface-raised',
              ].join(' ')}
            >
              <input
                type="radio"
                name="eventChoice"
                checked={selectedChoice === c.id}
                onChange={() => setSelectedChoice(c.id)}
                className="mt-0.5 accent-brand"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-xs text-ink">{c.label}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface border border-border text-ink-muted">
                    {c.badge}
                  </span>
                </div>
                <p className="text-[11px] text-ink-muted mt-0.5">{c.desc}</p>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="primary" onClick={handleConfirm} className="flex-1">
            Commit Decision
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ResolveEventDialog
