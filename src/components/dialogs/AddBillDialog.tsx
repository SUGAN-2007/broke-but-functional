import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export interface AddBillDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBillDialog({ open, onOpenChange }: AddBillDialogProps) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('2026-10-15')
  const [category, setCategory] = useState('Utilities')
  const [autopay, setAutopay] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Committed Bill</DialogTitle>
          <DialogDescription>
            Committed bills lock money away from your daily discretionary allowance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Bill Name"
            placeholder="e.g. Wi-Fi bill, Gym, Netflix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Amount (₹)"
              type="number"
              placeholder="500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'Rent', label: 'Rent' },
                { value: 'Utilities', label: 'Utilities' },
                { value: 'Health', label: 'Health' },
                { value: 'Entertainment', label: 'Entertainment' },
                { value: 'Mobile', label: 'Mobile' },
              ]}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full h-10 px-3 rounded-[12px] bg-surface border border-border text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          {/* Themed Switch replacing native checkbox */}
          <div className="flex items-center justify-between p-3 rounded-[12px] bg-surface-raised border border-border">
            <div>
              <p className="font-display font-semibold text-xs text-ink">Auto-debit scheduled</p>
              <p className="text-[11px] text-ink-muted">Deducts automatically from your account</p>
            </div>
            <Switch checked={autopay} onCheckedChange={setAutopay} aria-label="Auto-debit scheduled" />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Save Bill
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

export default AddBillDialog
