import { RefreshCw, RotateCw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import type { Connector } from '@/types/finance'

interface PipelineCardProps {
  connector: Connector
  syncingId: string | null
  onSync: (id: string) => void
  onReconnect: (id: string) => void
  onDisconnect: (id: string) => void
  onToggleAutoCat: (id: string) => void
  onToggleAutoBills: (id: string) => void
}

export function PipelineCard({
  connector: conn,
  syncingId,
  onSync,
  onReconnect,
  onDisconnect,
  onToggleAutoCat,
  onToggleAutoBills,
}: PipelineCardProps) {
  const isNeedsReconnect =
    conn.status === 'needs-reconnect' ||
    conn.status === 'needs_reconnect' ||
    conn.needsReconnect === true

  return (
    <Card className="p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[12px] bg-brand text-brand-fg flex items-center justify-center font-display font-bold text-sm">
              {conn.monogram}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-ink">{conn.name}</h3>
              <p className="text-xs text-ink-muted font-body">{conn.type}</p>
            </div>
          </div>

          <Badge variant={conn.status === 'connected' ? 'safe' : 'warning'}>
            {conn.status === 'connected' ? 'Connected' : 'Needs reconnect'}
          </Badge>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2 my-3 p-3 rounded-[12px] bg-surface text-xs font-mono">
          <div>
            <span className="text-ink-muted block text-[10px] uppercase font-sans">Last Synced</span>
            <span className="font-bold text-ink">{conn.lastSynced}</span>
          </div>
          <div>
            <span className="text-ink-muted block text-[10px] uppercase font-sans">Imported (Mtd)</span>
            <span className="font-bold text-brand">{conn.importedThisMonth} transactions</span>
          </div>
        </div>

        {/* Toggles using Switch */}
        <div className="space-y-3 pt-2 border-t border-border text-xs">
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Auto-categorise transactions</span>
            <Switch
              checked={conn.autoCategorise}
              onCheckedChange={() => onToggleAutoCat(conn.id)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-muted">Auto-detect recurring bills</span>
            <Switch
              checked={conn.autoAddBills}
              onCheckedChange={() => onToggleAutoBills(conn.id)}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border mt-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isNeedsReconnect ? (
            <>
              <Button
                size="sm"
                variant="outline"
                disabled
                className="gap-1 text-xs font-medium opacity-50 cursor-not-allowed"
                title="Pipeline needs reconnection before syncing"
              >
                <RefreshCw size={12} /> Sync Now
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onReconnect(conn.id)}
                className="gap-1 text-xs font-semibold"
              >
                <RotateCw size={12} /> Reconnect
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSync(conn.id)}
              disabled={syncingId === conn.id}
              className="gap-1.5 text-xs font-semibold"
            >
              <RefreshCw size={13} className={syncingId === conn.id ? 'animate-spin' : ''} />
              {syncingId === conn.id ? 'Syncing...' : 'Sync Now'}
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onDisconnect(conn.id)}
          className="text-xs text-danger hover:underline font-semibold cursor-pointer"
        >
          Disconnect
        </button>
      </div>
    </Card>
  )
}
