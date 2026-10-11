import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw } from 'lucide-react'

export interface ConfirmResetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirmed?: () => void
  onConfirm?: () => void
}

export function ConfirmResetDialog({ open, onOpenChange, onConfirmed, onConfirm }: ConfirmResetDialogProps) {
  const [confirmPhrase, setConfirmPhrase] = useState('')

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmPhrase.toLowerCase() === 'reset') {
      onConfirmed?.()
      onConfirm?.()
      onOpenChange(false)
      setConfirmPhrase('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-danger flex items-center gap-2">
            <RotateCcw size={18} /> Reset 30-Day Month?
          </DialogTitle>
          <DialogDescription>
            This action restores all budgets, transactions, and simulation records back to Oct 3 (Day 1).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <div className="p-3.5 rounded-[12px] bg-danger-bg/50 border border-danger/30 text-xs text-ink-muted">
            <p className="font-semibold text-danger mb-1">Warning: Irreversible action</p>
            All custom simulation scenarios, connectors cache, and logged expenses will be reset to default mock state.
          </div>

          <div>
            <Input
              label="Type 'RESET' to confirm"
              placeholder="RESET"
              value={confirmPhrase}
              onChange={(e) => setConfirmPhrase(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              variant="danger"
              disabled={confirmPhrase.toLowerCase() !== 'reset'}
              className="flex-1"
            >
              Reset Everything
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmResetDialog
