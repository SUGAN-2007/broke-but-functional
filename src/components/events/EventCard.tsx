import { useState } from 'react'
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  Check,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/format'
import type { FinanceEvent, EventChoice } from '@/types/finance'

interface EventCardProps {
  event: FinanceEvent
  onResolve: (id: string, choice: EventChoice) => void
}

function SeverityIcon({ severity }: { severity: FinanceEvent['severity'] }) {
  if (severity === 'high') return <AlertCircle size={18} className="text-danger" aria-hidden="true" />
  if (severity === 'medium') return <AlertTriangle size={18} className="text-warning" aria-hidden="true" />
  return <Info size={18} className="text-brand" aria-hidden="true" />
}

export function EventCard({ event, onResolve }: EventCardProps) {
  const [chosen, setChosen] = useState<EventChoice | null>(null)
  const [isResolved, setIsResolved] = useState(false)

  const severityBadge: Record<FinanceEvent['severity'], React.ReactNode> = {
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
      {!isResolved ? (
          <div className="flex flex-col sm:flex-row gap-3 pt-1 animate-in fade-in-50 duration-200">
            {event.choices.map((choice) => {
              const selected = chosen?.tag === choice.tag
              return (
                <button
                  key={choice.tag}
                  type="button"
                  onClick={() => setChosen(choice)}
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
            })}
          </div>
        ) : (
          <div
            key="resolved"
            className="rounded-[12px] bg-safe-bg border border-safe/30 p-3.5 flex items-center justify-between gap-3 text-xs animate-in fade-in-50 duration-200"
          >
            <div className="flex items-center gap-2 text-safe font-semibold">
              <CheckCircle2 size={16} />
              <span>Resolved with choice: {chosen?.label}</span>
            </div>
            <span className="font-mono font-bold text-safe">
              {chosen?.impact === 0 ? 'Cash intact' : formatCurrency(chosen?.impact || 0)}
            </span>
          </div>
        )}

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
