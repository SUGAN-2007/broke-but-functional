import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { events } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import type { Event, EventChoice } from '@/data/mock'
import { fadeUp } from '@/lib/motion'

function SeverityIcon({ severity }: { severity: Event['severity'] }) {
  if (severity === 'high')   return <AlertCircle size={18} className="text-danger"  aria-hidden="true" />
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
      onClick={onClick}
      className={[
        'flex-1 flex flex-col gap-1.5 text-left',
        'rounded-[14px] border p-4',
        'transition-all duration-200 cursor-pointer',
        'focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
        selected
          ? 'border-brand bg-brand text-brand-fg'
          : 'border-border bg-surface-raised hover:border-brand/50 hover:bg-surface',
      ].join(' ')}
      aria-pressed={selected}
    >
      <div className="flex items-center justify-between">
        <span className={[
          'font-body font-[600] text-[0.9375rem]',
          selected ? 'text-brand-fg' : 'text-ink',
        ].join(' ')}>
          {choice.label}
        </span>
        <span className={[
          'font-mono text-[0.8125rem] font-[600]',
          choice.impact < 0
            ? selected ? 'text-brand-fg/80' : 'text-danger'
            : selected ? 'text-brand-fg/80' : 'text-safe',
        ].join(' ')}>
          {choice.impact < 0 ? '−' + formatCurrency(Math.abs(choice.impact)) : choice.impact === 0 ? '₹0' : '+' + formatCurrency(choice.impact)}
        </span>
      </div>
      <p className={[
        'font-body text-[0.8125rem] leading-relaxed',
        selected ? 'text-brand-fg/75' : 'text-ink-muted',
      ].join(' ')}>
        {choice.consequence}
      </p>
    </button>
  )
}

function EventCard({ event }: { event: Event }) {
  const [chosen, setChosen] = useState<string | null>(null)
  const [resolved, setResolved] = useState(false)

  const severityBadge: Record<Event['severity'], React.ReactNode> = {
    high:   <Badge variant="danger">High impact</Badge>,
    medium: <Badge variant="warning">Medium impact</Badge>,
    low:    <Badge variant="muted">Low impact</Badge>,
  }

  return (
    <Card className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-[10px] bg-surface-raised flex items-center justify-center shrink-0">
          <SeverityIcon severity={event.severity} />
        </div>
        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <h2 className="font-display font-[600] text-[1.0625rem] text-ink">{event.title}</h2>
            {severityBadge[event.severity]}
          </div>
          <p className="font-body text-[0.9375rem] text-ink-muted leading-relaxed">{event.description}</p>
        </div>
      </div>

      <hr className="ledger-divider" />

      {/* Choices */}
      <AnimatePresence mode="wait">
        {!resolved ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {event.choices.map((choice) => (
              <ChoiceButton
                key={choice.tag}
                choice={choice}
                onClick={() => setChosen(choice.tag)}
                selected={chosen === choice.tag}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[12px] bg-safe-bg border border-safe px-4 py-3"
          >
            <p className="font-body font-[600] text-safe">Decision recorded. Balance updated.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm */}
      {!resolved && (
        <div className="flex gap-3">
          <Button
            variant="primary"
            disabled={!chosen}
            onClick={() => setResolved(true)}
            className="flex-1"
          >
            Confirm choice
          </Button>
          <Button
            variant="ghost"
            onClick={() => setChosen(null)}
          >
            Reconsider
          </Button>
        </div>
      )}
    </Card>
  )
}

export default function Events() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-[var(--section-gap)]"
    >
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-2.5 mb-1">
          <Zap size={22} className="text-accent" aria-hidden="true" />
          <h1 className="font-display font-[700] text-[clamp(1.75rem,3vw+1rem,2.75rem)] text-ink tracking-[-0.02em]">
            Surprise Events
          </h1>
        </div>
        <p className="font-body text-ink-muted">
          Life happens. Make the call — and live with it.
        </p>
      </motion.div>

      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="flex flex-col gap-[var(--grid-gap)]"
      >
        {events.map((event) => (
          <motion.div key={event.id} variants={fadeUp}>
            <EventCard event={event} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
