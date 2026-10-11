import { Check, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/format'
import type { SyncInboxItem } from '@/types/finance'

interface ReviewInboxCardProps {
  inboxList: SyncInboxItem[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function ReviewInboxCard({
  inboxList,
  onApprove,
  onReject,
}: ReviewInboxCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-[700] text-sm text-ink">Needs Review Inbox</h2>
          {inboxList.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-accent text-accent-fg flex items-center justify-center text-[10px] font-bold">
              {inboxList.length}
            </span>
          )}
        </div>
        <span className="text-[11px] text-ink-muted">Awaiting confirmation</span>
      </div>

      {inboxList.length === 0 ? (
        <div className="p-6 text-center text-xs text-ink-muted border border-dashed border-border rounded-[12px]">
          Inbox clear! All auto-imported expenses approved.
        </div>
      ) : (
        <div className="divide-y divide-border">
          {inboxList.map((item) => (
            <div key={item.id} className="py-2.5 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-display font-semibold text-xs text-ink">
                      {item.description}
                    </span>
                    {item.isDuplicate && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-danger-bg text-danger border border-danger/30">
                        Possible Duplicate
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-ink-muted mt-0.5">
                    {item.merchant} • {item.date} ({item.source})
                  </p>
                </div>
                <span className="font-mono font-bold text-xs text-ink">
                  {formatCurrency(item.amount)}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => onApprove(item.id)}
                  className="text-[11px] py-0.5 px-2.5 h-7"
                >
                  <Check size={12} className="mr-1" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onReject(item.id)}
                  className="text-[11px] py-0.5 px-2.5 h-7 text-danger hover:text-danger"
                >
                  <X size={12} className="mr-1" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
