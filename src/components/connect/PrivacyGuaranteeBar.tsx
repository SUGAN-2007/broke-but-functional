import { ShieldCheck } from 'lucide-react'

export function PrivacyGuaranteeBar() {
  return (
    <div className="p-4 rounded-[16px] bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
      <div className="flex items-center gap-2.5">
        <ShieldCheck size={18} className="text-safe shrink-0" />
        <p className="font-body">
          <span className="font-bold text-ink">Privacy Guarantee: </span>
          Read-only transaction access. Your financial data stays strictly on this device. Disconnect any time with zero leftover traces.
        </p>
      </div>
      <span className="font-mono text-[10px] text-ink-muted shrink-0">
        RBI Account Aggregator Compliant
      </span>
    </div>
  )
}
