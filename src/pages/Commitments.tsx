import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { bills as initialBills } from '@/data'
import { sumBy } from '@/data/selectors'
import type { Bill } from '@/types/finance'
import { AddBillDialog } from '@/components/dialogs'
import { BillsSummaryCards } from '@/components/bills/BillsSummaryCards'
import { BillListSection } from '@/components/bills/BillListSection'

export default function Commitments() {
  const [billList, setBillList] = useState<Bill[]>(initialBills)
  const [addBillOpen, setAddBillOpen] = useState(false)

  const handleMarkPaid = (id: string) => {
    setBillList((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'paid' as const } : b))
    )
  }

  const unpaidBills = billList.filter((b) => b.status !== 'paid')
  const paidBills = billList.filter((b) => b.status === 'paid')
  const totalUnpaid = sumBy(unpaidBills, (b) => b.amount)
  const totalCommitted = sumBy(billList, (b) => b.amount)
  const totalPaid = sumBy(paidBills, (b) => b.amount)

  const urgent = unpaidBills.filter((b) => b.dueInDays <= 2)
  const soon = unpaidBills.filter((b) => b.dueInDays > 2 && b.dueInDays <= 7)
  const later = unpaidBills.filter((b) => b.dueInDays > 7)

  return (
    <div className="flex flex-col gap-6">
      {/* Header with Add Bill CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Committed Bills & Dues
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
            Committed life dues that must be protected before any discretionary spending.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setAddBillOpen(true)}
          className="self-start sm:self-auto gap-1.5 text-xs font-semibold"
        >
          <Plus size={14} /> Add Bill
        </Button>
      </div>

      {/* Summary Cards */}
      <div>
        <BillsSummaryCards
          totalCommitted={totalCommitted}
          totalUnpaid={totalUnpaid}
          totalPaid={totalPaid}
          billsCount={billList.length}
          unpaidCount={unpaidBills.length}
          paidCount={paidBills.length}
          paidBills={paidBills}
        />
      </div>

      {/* Grouped lists */}
      <div>
        <BillListSection
          urgent={urgent}
          soon={soon}
          later={later}
          paidBills={paidBills}
          onMarkPaid={handleMarkPaid}
        />
      </div>

      <AddBillDialog open={addBillOpen} onOpenChange={setAddBillOpen} />
    </div>
  )
}
