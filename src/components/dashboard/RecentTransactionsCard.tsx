import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'
import { transactions } from '@/data'
import { formatCurrency } from '@/lib/format'

export function RecentTransactionsCard() {
  return (
    <Card className="h-full flex flex-col p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="font-display font-[700] text-sm text-ink">Recent Transactions</h2>
          <p className="font-body text-xs text-ink-muted">Expenses tagged with auto-sync and expensive alerts</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/connect" className="text-xs text-brand hover:underline font-semibold flex items-center gap-1">
            <RefreshCw size={11} /> Auto-Sync Feed
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border overflow-y-auto max-h-[300px] pr-1">
        {transactions.map((txn) => (
          <div key={txn.id} className="py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-[10px] bg-surface flex items-center justify-center shrink-0 border border-border">
                <span className="text-xs font-bold text-ink-muted">{txn.category[0]}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold text-xs text-ink truncate">
                    {txn.description}
                  </span>
                  {txn.isExpensive && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-danger-bg text-danger border border-danger/30">
                      Expensive
                    </span>
                  )}
                  {txn.isAutoSynced && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-surface text-ink-muted border border-border">
                      Auto-synced
                    </span>
                  )}
                  {txn.isFixedBill && (
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-medium bg-surface text-ink-muted border border-border">
                      Fixed Bill
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-ink-muted font-body mt-0.5">
                  {txn.merchant} • {txn.date}, {txn.time}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0 font-mono">
              <span
                className={[
                  'text-xs font-bold block',
                  txn.type === 'credit' ? 'text-safe' : 'text-ink',
                ].join(' ')}
              >
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount)}
              </span>
              <p className="text-[10px] text-ink-muted">{txn.category}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
