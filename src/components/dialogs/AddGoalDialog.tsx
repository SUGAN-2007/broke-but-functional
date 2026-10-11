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

export interface AddGoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddGoalDialog({ open, onOpenChange }: AddGoalDialogProps) {
  const [name, setName] = useState('')
  const [target, setTarget] = useState('2000')
  const [category, setCategory] = useState('Gear')
  const [targetDate, setTargetDate] = useState('2026-10-30')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Savings Goal</DialogTitle>
          <DialogDescription>
            Ringfence spare cash away from impulsive discretionary spending.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Goal Name"
            placeholder="e.g. Noise-cancelling headphones, Goa trip"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Target Amount (₹)"
              type="number"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              min="100"
              required
            />
            <Select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: 'Gear', label: 'Gear' },
                { value: 'Safety', label: 'Safety Cushion' },
                { value: 'Travel', label: 'Travel' },
                { value: 'Education', label: 'Course / Learning' },
              ]}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5 font-body">
              Target Deadline
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full h-10 px-3 rounded-[12px] bg-surface border border-border text-ink text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" className="flex-1">
              Create Goal
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

export default AddGoalDialog
