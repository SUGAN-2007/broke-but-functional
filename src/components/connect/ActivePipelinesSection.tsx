import { PipelineCard } from './PipelineCard'
import type { Connector } from '@/types/finance'

interface ActivePipelinesSectionProps {
  connected: Connector[]
  syncingId: string | null
  onSync: (id: string) => void
  onReconnect: (id: string) => void
  onDisconnect: (id: string) => void
  onToggleAutoCat: (id: string) => void
  onToggleAutoBills: (id: string) => void
}

export function ActivePipelinesSection({
  connected,
  syncingId,
  onSync,
  onReconnect,
  onDisconnect,
  onToggleAutoCat,
  onToggleAutoBills,
}: ActivePipelinesSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-[700] text-sm text-ink flex items-center gap-2">
          <span>Active Pipelines ({connected.length})</span>
          <span className="w-2 h-2 rounded-full bg-safe" />
        </h2>
        <span className="text-xs text-ink-muted">Read-only account aggregator protocol</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connected.map((conn) => (
          <PipelineCard
            key={conn.id}
            connector={conn}
            syncingId={syncingId}
            onSync={onSync}
            onReconnect={onReconnect}
            onDisconnect={onDisconnect}
            onToggleAutoCat={onToggleAutoCat}
            onToggleAutoBills={onToggleAutoBills}
          />
        ))}
      </div>
    </div>
  )
}
