import { History } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { formatCurrency } from '@/lib/format'
import type { ResolvedEventHistory } from '@/types/finance'

interface ResolvedEventsHistoryCardProps {
  historyList: ResolvedEventHistory[]
}

export function ResolvedEventsHistoryCard({ historyList }: ResolvedEventsHistoryCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <History size={16} className="text-brand" />
          <h2 className="font-display font-[700] text-sm text-ink">
            Resolved Incidents Log ({historyList.length})
          </h2>
        </div>
        <span className="text-[10px] text-ink-muted font-mono">Past 8 Days</span>
      </div>

      <div className="divide-y divide-border">
        {historyList.map((hist) => (
          <div key={hist.id} className="py-3 flex items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-display font-semibold text-ink text-xs">{hist.title}</p>
              <p className="text-[11px] text-ink-muted font-body mt-0.5">
                {hist.choiceMade} • {hist.date}
              </p>
            </div>
            <div className="text-right">
              <span
                className={[
                  'font-mono font-bold text-xs',
                  hist.impact < 0 ? 'text-danger' : 'text-safe',
                ].join(' ')}
              >
                {hist.impact < 0 ? formatCurrency(hist.impact) : '₹0'}
              </span>
              <p className="text-[10px] text-safe font-semibold">Resolved</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
