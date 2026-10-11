import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Zap,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  History,
  Check,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { events as initialEvents, resolvedEventsHistory } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import type { Event, EventChoice } from '@/data/mock'
import { fadeUp } from '@/lib/motion'

function SeverityIcon({ severity }: { severity: Event['severity'] }) {
  if (severity === 'high')   return <AlertCircle size={18} className="text-danger" aria-hidden="true" />
  if (severity === 'medium') return <AlertTriangle size={18} className="text-warning" aria-hidden="true" />
  return <Info size={18} className="text-brand" aria-hidden="true" />
}

function ChoiceButton({
  choice,
  onClick,
  selected,
}: {
  choice: EventChoice
  onClick: () => void
  selected: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex-1 flex flex-col gap-1.5 text-left rounded-[14px] border p-3.5 transition-all cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
        selected
          ? 'border-brand bg-brand text-brand-fg shadow-xs'
          : 'border-border bg-surface hover:border-brand/40 hover:bg-surface-raised',
      ].join(' ')}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={[
            'font-display font-[700] text-xs sm:text-sm',
            selected ? 'text-brand-fg' : 'text-ink',
          ].join(' ')}
        >
          {choice.label}
        </span>
        <span
          className={[
            'font-mono text-xs font-bold shrink-0',
            choice.impact < 0
              ? selected ? 'text-brand-fg' : 'text-danger'
              : selected ? 'text-brand-fg' : 'text-safe',
          ].join(' ')}
        >
          {choice.impact < 0
            ? '-' + formatCurrency(Math.abs(choice.impact))
            : choice.impact === 0
            ? '₹0'
            : '+' + formatCurrency(choice.impact)}
        </span>
      </div>
      <p
        className={[
          'font-body text-[11px] leading-relaxed',
          selected ? 'text-brand-fg/80' : 'text-ink-muted',
        ].join(' ')}
      >
        {choice.consequence}
      </p>
    </button>
  )
}

function EventCard({
  event,
  onResolve,
}: {
  event: Event
  onResolve: (id: string, choice: EventChoice) => void
}) {
  const [chosen, setChosen] = useState<EventChoice | null>(null)
  const [isResolved, setIsResolved] = useState(false)

  const severityBadge: Record<Event['severity'], React.ReactNode> = {
    high:   <Badge variant="danger" className="text-[10px] font-bold uppercase">High Risk</Badge>,
    medium: <Badge variant="warning" className="text-[10px] font-bold uppercase">Medium Risk</Badge>,
    low:    <Badge variant="neutral" className="text-[10px] font-bold uppercase">Low Impact</Badge>,
  }

  const handleConfirm = () => {
    if (chosen) {
      setIsResolved(true)
      onResolve(event.id, chosen)
    }
  }

  return (
    <Card className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3.5">
        <div
          className={[
            'w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border',
            event.severity === 'high'
              ? 'bg-danger-bg text-danger border-danger/30'
              : 'bg-warning-bg text-warning border-warning/30',
          ].join(' ')}
          aria-hidden="true"
        >
          <SeverityIcon severity={event.severity} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <h2 className="font-display font-[700] text-sm sm:text-base text-ink">
              {event.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs text-ink">{formatCurrency(event.amount)}</span>
              {severityBadge[event.severity]}
            </div>
          </div>
          <p className="font-body text-xs text-ink-muted leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>

      {/* Choices */}
      <AnimatePresence mode="wait">
        {!isResolved ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            {event.choices.map((choice) => (
              <ChoiceButton
                key={choice.tag}
                choice={choice}
                onClick={() => setChosen(choice)}
                selected={chosen?.tag === choice.tag}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[12px] bg-safe-bg border border-safe/30 p-3.5 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2 text-safe font-semibold">
              <CheckCircle2 size={16} />
              <span>Resolved with choice: {chosen?.label}</span>
            </div>
            <span className="font-mono font-bold text-safe">
              {chosen?.impact === 0 ? 'Cash intact' : formatCurrency(chosen?.impact || 0)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation bar */}
      {!isResolved && (
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setChosen(null)}
            disabled={!chosen}
            className="text-xs"
          >
            Clear selection
          </Button>
          <Button
            size="sm"
            variant="primary"
            disabled={!chosen}
            onClick={handleConfirm}
            className="gap-1.5 text-xs font-semibold"
          >
            <Check size={14} /> Confirm Choice
          </Button>
        </div>
      )}
    </Card>
  )
}

export default function Events() {
  const [activeEvents] = useState<Event[]>(initialEvents)
  const [historyList, setHistoryList] = useState(resolvedEventsHistory)

  const handleResolveEvent = (id: string, choice: EventChoice) => {
    const resolvedEvt = activeEvents.find((e) => e.id === id)
    if (resolvedEvt) {
      setHistoryList((prev) => [
        {
          id: `hist-${Date.now()}`,
          title: resolvedEvt.title,
          date: 'Today (Oct 10)',
          choiceMade: choice.label,
          impact: choice.impact,
          status: 'Resolved',
        },
        ...prev,
      ])
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2.5 mb-1">
          <Zap size={24} className="text-accent" aria-hidden="true" />
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Unexpected Incidents & Dilemmas
          </h1>
        </div>
        <p className="font-body text-xs sm:text-sm text-ink-muted">
          Random life shocks that test your budget resilience. Every decision triggers an immediate ripple across your Oct 28 (Day 26) runway.
        </p>
      </motion.div>

      {/* Active Incidents List */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-col gap-4"
      >
        {activeEvents.map((event) => (
          <motion.div key={event.id} variants={fadeUp}>
            <EventCard event={event} onResolve={handleResolveEvent} />
          </motion.div>
        ))}
      </motion.div>

      {/* RESOLVED EVENTS HISTORY SECTION */}
      <motion.div variants={fadeUp}>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <History size={16} className="text-brand" />
              <h2 className="font-display font-[700] text-sm text-ink">
                Resolved Incidents Log ({historyList.length})
              </h2>
            </div>
            <span className="text-[10px] text-ink-muted font-mono">Past 8 Days</span>
          </div>

          <div className="divide-y divide-border">
            {historyList.map((hist) => (
              <div key={hist.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-display font-semibold text-ink text-xs">{hist.title}</p>
                  <p className="text-[11px] text-ink-muted font-body mt-0.5">
                    {hist.choiceMade} • {hist.date}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={[
                      'font-mono font-bold text-xs',
                      hist.impact < 0 ? 'text-danger' : 'text-safe',
                    ].join(' ')}
                  >
                    {hist.impact < 0 ? formatCurrency(hist.impact) : '₹0'}
                  </span>
                  <p className="text-[10px] text-safe font-semibold">Resolved</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
