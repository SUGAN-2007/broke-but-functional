import { useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { Connector } from '@/types/finance'

interface ConnectStepperDialogProps {
  connector: Connector | null
  onClose: () => void
  onFinish: (connector: Connector) => void
}

export function ConnectStepperDialog({
  connector,
  onClose,
  onFinish,
}: ConnectStepperDialogProps) {
  const [connectStep, setConnectStep] = useState<1 | 2 | 3>(1)

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConnectStep(1)
      onClose()
    }
  }

  const handleComplete = () => {
    if (connector) {
      onFinish(connector)
    }
    setConnectStep(1)
  }

  return (
    <Dialog open={!!connector} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect {connector?.name}</DialogTitle>
          <DialogDescription>
            Step {connectStep} of 3: Privacy and read-only protocol setup.
          </DialogDescription>
        </DialogHeader>

        {connectStep === 1 && (
          <div className="flex flex-col gap-4 py-2">
            <div className="p-3.5 rounded-[12px] bg-surface border border-border text-xs text-ink-muted">
              <p className="font-bold text-ink mb-1">Verify Source Bridge</p>
              You are setting up automated parsing for{' '}
              <span className="font-semibold text-brand">{connector?.type}</span>.
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => setConnectStep(2)}
                className="flex-1"
              >
                Continue to Permissions →
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {connectStep === 2 && (
          <div className="flex flex-col gap-3 py-2 text-xs">
            <div className="p-3.5 rounded-[12px] bg-surface-raised border border-border">
              <span className="font-display font-bold text-xs text-ink block mb-2">
                Requested Permissions (Strictly Read-Only)
              </span>
              <ul className="space-y-1.5 text-ink-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-safe shrink-0" />
                  <span>Can read transaction amount, merchant, and timestamp.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-safe shrink-0" />
                  <span>Can classify transactions into Food, Transport, and Bills.</span>
                </li>
                <li className="flex items-center gap-2 text-danger font-semibold">
                  <X size={13} className="shrink-0" />
                  <span>CANNOT initiate transfers or move any money.</span>
                </li>
                <li className="flex items-center gap-2 text-danger font-semibold">
                  <X size={13} className="shrink-0" />
                  <span>CANNOT view account numbers or passwords.</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => setConnectStep(3)}
                className="flex-1"
              >
                Grant Read-Only Access
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setConnectStep(1)}
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {connectStep === 3 && (
          <div className="flex flex-col gap-4 py-2 text-center">
            <div className="w-12 h-12 rounded-full bg-safe-bg text-safe flex items-center justify-center mx-auto border border-safe/30">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-display font-bold text-sm text-ink">Ready to Activate</p>
              <p className="text-xs text-ink-muted font-body mt-1">
                Click confirm to simulate instant pipeline syncing.
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={handleComplete}
                className="flex-1"
              >
                Confirm & Sync
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
