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
import { categoryOptions } from '@/data/mock'

interface AddExpenseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddExpenseDialog({ open, onOpenChange }: AddExpenseDialogProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [note, setNote] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // UI-only: just close
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log an expense</DialogTitle>
          <DialogDescription>
            Track what you spent. Every rupee counts when you're surviving on ₹10K.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <Input
            label="What did you spend on?"
            placeholder="Swiggy dinner, metro recharge…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            autoFocus
          />
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                label="Amount (₹)"
                type="number"
                placeholder="349"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="1"
                required
              />
            </div>
            <div className="flex-1">
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={categoryOptions.map((c) => ({ value: c, label: c }))}
              />
            </div>
          </div>
          <Input
            label="Note (optional)"
            placeholder="Late-night hunger, worth it"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Log expense
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
