import { Upload } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Connector } from '@/types/finance'

interface AvailableSourcesCardProps {
  available: Connector[]
  onStartConnect: (conn: Connector) => void
}

export function AvailableSourcesCard({
  available,
  onStartConnect,
}: AvailableSourcesCardProps) {
  return (
    <Card className="p-5 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-display font-[700] text-sm text-ink">
              Available Connectors & Sources
            </h2>
            <p className="font-body text-xs text-ink-muted">
              Generic protocol bridges to automate manual entry
            </p>
          </div>
        </div>

        <div className="divide-y divide-border">
          {available.map((conn) => (
            <div key={conn.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-[10px] bg-surface flex items-center justify-center font-mono font-bold text-xs text-ink-muted border border-border shrink-0">
                  {conn.monogram}
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-xs text-ink truncate">{conn.name}</p>
                  <p className="text-[11px] text-ink-muted font-body truncate">{conn.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {conn.status === 'coming_soon' ? (
                  <Badge variant="neutral" className="text-[10px]">Coming Soon</Badge>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStartConnect(conn)}
                    className="text-xs py-1 px-2.5"
                  >
                    Connect
                  </Button>
                )}
              </div>
            </div>
          ))}

          {/* CSV / Statement Import Dropzone */}
          <div className="pt-3">
            <div className="p-4 rounded-[14px] border border-dashed border-border-strong bg-surface hover:bg-surface-raised transition-colors flex flex-col items-center justify-center text-center cursor-pointer">
              <Upload size={20} className="text-brand mb-1.5" />
              <p className="font-display font-semibold text-xs text-ink">
                Drop Bank CSV or PDF Statement
              </p>
              <p className="text-[10px] text-ink-muted font-body mt-0.5">
                Supports SBI, HDFC, ICICI, Axis and UPI transaction summaries (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
