import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  connectors as initialConnectors,
  syncInboxItems as initialInbox,
  syncActivityLogs,
} from '@/data'
import type { Connector, SyncInboxItem } from '@/types/finance'
import { ConnectNoticeBanner } from '@/components/connect/ConnectNoticeBanner'
import { ActivePipelinesSection } from '@/components/connect/ActivePipelinesSection'
import { AvailableSourcesCard } from '@/components/connect/AvailableSourcesCard'
import { ReviewInboxCard } from '@/components/connect/ReviewInboxCard'
import { SyncActivityLogCard } from '@/components/connect/SyncActivityLogCard'
import { ConnectStepperDialog } from '@/components/connect/ConnectStepperDialog'
import { PrivacyGuaranteeBar } from '@/components/connect/PrivacyGuaranteeBar'

export default function Connect() {
  const [connectorsList, setConnectorsList] = useState<Connector[]>(initialConnectors)
  const [inboxList, setInboxList] = useState<SyncInboxItem[]>(initialInbox)
  const [syncingId, setSyncingId] = useState<string | null>(null)
  const [selectedConnectorToConnect, setSelectedConnectorToConnect] = useState<Connector | null>(null)
  const [isSuccessToast, setIsSuccessToast] = useState(false)

  const connected = connectorsList.filter(
    (c) => c.status === 'connected' || c.status === 'needs-reconnect' || c.status === 'needs_reconnect' || c.needsReconnect
  )
  const available = connectorsList.filter(
    (c) => c.status !== 'connected' && c.status !== 'needs-reconnect' && c.status !== 'needs_reconnect' && !c.needsReconnect
  )

  const handleSyncNow = (id: string) => {
    setSyncingId(id)
    setTimeout(() => {
      setSyncingId(null)
      setIsSuccessToast(true)
      setTimeout(() => setIsSuccessToast(false), 2500)
    }, 1200)
  }

  const handleReconnect = (id: string) => {
    setConnectorsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'connected' as const, lastSynced: 'Just now', needsReconnect: false } : c))
    )
    setIsSuccessToast(true)
    setTimeout(() => setIsSuccessToast(false), 2500)
  }

  const handleToggleAutoCat = (id: string) => {
    setConnectorsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, autoCategorise: !c.autoCategorise } : c))
    )
  }

  const handleToggleAutoBills = (id: string) => {
    setConnectorsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, autoAddBills: !c.autoAddBills } : c))
    )
  }

  const handleDisconnect = (id: string) => {
    setConnectorsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'disconnected' as const } : c))
    )
  }

  const handleFinishConnect = (conn: Connector) => {
    setConnectorsList((prev) =>
      prev.map((c) =>
        c.id === conn.id
          ? { ...c, status: 'connected' as const, lastSynced: 'Just now', importedThisMonth: 5, autoCategorise: true, autoAddBills: true }
          : c
      )
    )
    setSelectedConnectorToConnect(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Auto-Sync & Financial Connectors
          </h1>
          <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
            Simulated read-only integration pipelines to track UPI expenses, bank entries, and e-bills.
          </p>
        </div>
        {isSuccessToast && (
          <Badge variant="safe" className="animate-in fade-in self-start sm:self-auto">
            <CheckCircle2 size={12} className="mr-1" /> Synced 3 items
          </Badge>
        )}
      </div>

      <div><ConnectNoticeBanner /></div>

      <div>
        <ActivePipelinesSection
          connected={connected}
          syncingId={syncingId}
          onSync={handleSyncNow}
          onReconnect={handleReconnect}
          onDisconnect={handleDisconnect}
          onToggleAutoCat={handleToggleAutoCat}
          onToggleAutoBills={handleToggleAutoBills}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7">
          <AvailableSourcesCard
            available={available}
            onStartConnect={(conn) => setSelectedConnectorToConnect(conn)}
          />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-5">
          <ReviewInboxCard
            inboxList={inboxList}
            onApprove={(id) => setInboxList((p) => p.filter((x) => x.id !== id))}
            onReject={(id) => setInboxList((p) => p.filter((x) => x.id !== id))}
          />
          <SyncActivityLogCard logs={syncActivityLogs} />
        </div>
      </div>

      <div><PrivacyGuaranteeBar /></div>

      <ConnectStepperDialog
        connector={selectedConnectorToConnect}
        onClose={() => setSelectedConnectorToConnect(null)}
        onFinish={handleFinishConnect}
      />
    </div>
  )
}
