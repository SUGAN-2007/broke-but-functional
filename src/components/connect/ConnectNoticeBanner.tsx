import { Info } from 'lucide-react'

export function ConnectNoticeBanner() {
  return (
    <div className="p-4 rounded-[16px] bg-warning-bg/40 border border-warning/30 flex items-start gap-3">
      <Info size={18} className="text-warning shrink-0 mt-0.5" />
      <div className="text-xs">
        <p className="font-display font-bold text-ink">
          Simulated Connectors Notice
        </p>
        <p className="text-ink-muted font-body mt-0.5 leading-relaxed">
          Nothing is really connected. This app never asks for passwords, OTPs, PINs or write access.
        </p>
      </div>
    </div>
  )
}
