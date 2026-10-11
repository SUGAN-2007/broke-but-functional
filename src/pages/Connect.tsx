import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import {
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Check,
  X,
  Upload,
  Info,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  connectors as initialConnectors,
  syncInboxItems as initialInbox,
  syncActivityLogs,
  type Connector,
  type SyncInboxItem,
} from '@/data/mock'
import { formatCurrency } from '@/lib/utils'

export default function Connect() {
  const [connectorsList, setConnectorsList] = useState<Connector[]>(initialConnectors)
  const [inboxList, setInboxList] = useState<SyncInboxItem[]>(initialInbox)
  const [syncingId, setSyncingId] = useState<string | null>(null)
  const [selectedConnectorToConnect, setSelectedConnectorToConnect] = useState<Connector | null>(null)
  const [connectStep, setConnectStep] = useState<1 | 2 | 3>(1)
  const [isSuccessToast, setIsSuccessToast] = useState(false)

  // Filter connected vs available
  const connected = connectorsList.filter((c) => c.status === 'connected' || c.status === 'needs_attention')
  const available = connectorsList.filter((c) => c.status !== 'connected' && c.status !== 'needs_attention')

  const handleSyncNow = (id: string) => {
    setSyncingId(id)
    setTimeout(() => {
      setSyncingId(null)
      setIsSuccessToast(true)
      setTimeout(() => setIsSuccessToast(false), 2500)
    }, 1200)
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
      prev.map((c) => (c.id === id ? { ...c, status: 'not_connected' as const } : c))
    )
  }

  const handleApproveInbox = (id: string) => {
    setInboxList((prev) => prev.filter((item) => item.id !== id))
  }

  const handleRejectInbox = (id: string) => {
    setInboxList((prev) => prev.filter((item) => item.id !== id))
  }

  const handleStartConnectFlow = (conn: Connector) => {
    setSelectedConnectorToConnect(conn)
    setConnectStep(1)
  }

  const handleFinishConnect = () => {
    if (selectedConnectorToConnect) {
      setConnectorsList((prev) =>
        prev.map((c) =>
          c.id === selectedConnectorToConnect.id
            ? {
                ...c,
                status: 'connected' as const,
                lastSynced: 'Just now',
                importedThisMonth: 5,
                autoCategorise: true,
                autoAddBills: true,
              }
            : c
        )
      )
    }
    setSelectedConnectorToConnect(null)
    setConnectStep(1)
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
              Auto-Sync & Financial Connectors
            </h1>
            <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
              Simulated read-only integration pipelines to track UPI expenses, bank entries, and e-bills.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isSuccessToast && (
              <Badge variant="safe" className="animate-in fade-in">
                <CheckCircle2 size={12} className="mr-1" /> Synced 3 items
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* DEMO NOTICE BANNER (REQUIRED BY SPEC) */}
      <motion.div variants={fadeUp}>
        <div className="p-4 rounded-[16px] bg-warning-bg/40 border border-warning/30 flex items-start gap-3">
          <Info size={18} className="text-warning shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-display font-bold text-ink">
              Demo Connectors: Simulated Data, Nothing Is Really Connected
            </p>
            <p className="text-ink-muted font-body mt-0.5 leading-relaxed">
              This interface illustrates privacy-first automated banking connectors. Antigravity will never request passwords, OTPs, PINs, or write permissions. All interactions below run purely in local memory.
            </p>
          </div>
        </div>
      </motion.div>

      {/* SECTION 1: CONNECTED SERVICES (2 EXAMPLES) */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-[700] text-sm text-ink flex items-center gap-2">
            <span>Active Pipelines ({connected.length})</span>
            <span className="w-2 h-2 rounded-full bg-safe" />
          </h2>
          <span className="text-xs text-ink-muted">Read-only account aggregator protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {connected.map((conn) => (
            <Card key={conn.id} className="p-5 flex flex-col justify-between">
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
                    {conn.status === 'connected' ? 'Connected' : 'Needs Token'}
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

                {/* Toggles */}
                <div className="space-y-2 pt-2 border-t border-border text-xs">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-ink-muted">Auto-categorise transactions</span>
                    <input
                      type="checkbox"
                      checked={conn.autoCategorise}
                      onChange={() => handleToggleAutoCat(conn.id)}
                      className="w-4 h-4 rounded text-brand focus:ring-brand"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-ink-muted">Auto-detect recurring bills</span>
                    <input
                      type="checkbox"
                      checked={conn.autoAddBills}
                      onChange={() => handleToggleAutoBills(conn.id)}
                      className="w-4 h-4 rounded text-brand focus:ring-brand"
                    />
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSyncNow(conn.id)}
                  disabled={syncingId === conn.id}
                  className="gap-1.5 text-xs font-semibold"
                >
                  <RefreshCw size={13} className={syncingId === conn.id ? 'animate-spin' : ''} />
                  {syncingId === conn.id ? 'Syncing...' : 'Sync Now'}
                </Button>
                <button
                  type="button"
                  onClick={() => handleDisconnect(conn.id)}
                  className="text-xs text-danger hover:underline font-semibold cursor-pointer"
                >
                  Disconnect
                </button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* SECTION 2 & 3: AVAILABLE CONNECTORS & INBOX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left: Available Connectors (7 cols) */}
        <motion.div variants={fadeUp} className="lg:col-span-7">
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
                          onClick={() => handleStartConnectFlow(conn)}
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
        </motion.div>

        {/* Right: Needs Review Inbox & Activity Log (5 cols) */}
        <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Needs Review Inbox */}
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
                            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-danger-bg text-danger border border-danger/30">
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
                        onClick={() => handleApproveInbox(item.id)}
                        className="text-[11px] py-0.5 px-2.5 h-7"
                      >
                        <Check size={12} className="mr-1" /> Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectInbox(item.id)}
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

          {/* Sync Activity Log */}
          <Card className="p-5 flex-1">
            <h2 className="font-display font-[700] text-sm text-ink mb-3">Sync Activity Log</h2>
            <div className="space-y-2.5 text-xs">
              {syncActivityLogs.map((log) => (
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
        </motion.div>

      </div>

      {/* PRIVACY PANEL */}
      <motion.div variants={fadeUp}>
        <div className="p-4 rounded-[16px] bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-muted">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-safe shrink-0" />
            <p className="font-body">
              <span className="font-bold text-ink">Privacy Guarantee: </span>
              Read-only transaction access. Your financial data stays strictly on this device. Disconnect any time with zero leftover traces.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink-muted shrink-0">RBI Account Aggregator Compliant</span>
        </div>
      </motion.div>

      {/* CONNECT STEPPER DIALOG (NO CREDENTIAL FIELDS) */}
      <Dialog
        open={!!selectedConnectorToConnect}
        onOpenChange={(v) => !v && setSelectedConnectorToConnect(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect {selectedConnectorToConnect?.name}</DialogTitle>
            <DialogDescription>
              Step {connectStep} of 3: Privacy and read-only protocol setup.
            </DialogDescription>
          </DialogHeader>

          {connectStep === 1 && (
            <div className="flex flex-col gap-4 py-2">
              <div className="p-3.5 rounded-[12px] bg-surface border border-border text-xs text-ink-muted">
                <p className="font-bold text-ink mb-1">Verify Source Bridge</p>
                You are setting up automated parsing for{' '}
                <span className="font-semibold text-brand">{selectedConnectorToConnect?.type}</span>.
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setConnectStep(2)}
                  className="flex-1"
                >
                  Continue to Permissions →
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedConnectorToConnect(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {connectStep === 2 && (
            <div className="flex flex-col gap-3 py-2 text-xs">
              <div className="p-3.5 rounded-[12px] bg-surface-raised border border-border">
                <span className="font-display font-bold text-xs text-ink block mb-2">
                  Requested Permissions (Strictly Read-Only)
                </span>
                <ul className="space-y-1.5 text-ink-muted">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-safe shrink-0" />
                    <span>Can read transaction amount, merchant, and timestamp.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-safe shrink-0" />
                    <span>Can classify transactions into Food, Transport, and Bills.</span>
                  </li>
                  <li className="flex items-center gap-2 text-danger font-semibold">
                    <X size={13} className="shrink-0" />
                    <span>CANNOT initiate transfers or move any money.</span>
                  </li>
                  <li className="flex items-center gap-2 text-danger font-semibold">
                    <X size={13} className="shrink-0" />
                    <span>CANNOT view account numbers or passwords.</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setConnectStep(3)}
                  className="flex-1"
                >
                  Grant Read-Only Access
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConnectStep(1)}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {connectStep === 3 && (
            <div className="flex flex-col gap-4 py-2 text-center">
              <div className="w-12 h-12 rounded-full bg-safe-bg text-safe flex items-center justify-center mx-auto border border-safe/30">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-ink">Ready to Activate</p>
                <p className="text-xs text-ink-muted font-body mt-1">
                  Click confirm to simulate instant pipeline syncing.
                </p>
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleFinishConnect}
                  className="flex-1"
                >
                  Confirm & Sync
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedConnectorToConnect(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
