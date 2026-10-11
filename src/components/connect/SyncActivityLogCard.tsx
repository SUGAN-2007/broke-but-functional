import { Card } from '@/components/ui/card'
import type { SyncActivityLog } from '@/types/finance'

interface SyncActivityLogCardProps {
  logs: SyncActivityLog[]
}

export function SyncActivityLogCard({ logs }: SyncActivityLogCardProps) {
  return (
    <Card className="p-5 flex-1">
      <h2 className="font-display font-[700] text-sm text-ink mb-3">Sync Activity Log</h2>
      <div className="space-y-2.5 text-xs">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 shrink-0" />
            <div className="flex-1">
              <p className="text-ink font-body leading-tight text-xs">{log.message}</p>
              <span className="text-[10px] text-ink-muted font-mono">{log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
