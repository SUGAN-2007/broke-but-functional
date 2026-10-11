import { useState } from 'react'
import { Zap } from 'lucide-react'
import { events as initialEvents, resolvedEventsHistory } from '@/data'
import type { FinanceEvent, EventChoice, ResolvedEventHistory } from '@/types/finance'
import { EventCard } from '@/components/events/EventCard'
import { ResolvedEventsHistoryCard } from '@/components/events/ResolvedEventsHistoryCard'

export default function Events() {
  const [activeEvents] = useState<FinanceEvent[]>(initialEvents)
  const [historyList, setHistoryList] = useState<ResolvedEventHistory[]>(resolvedEventsHistory)

  const handleResolveEvent = (id: string, choice: EventChoice) => {
    const resolvedEvt = activeEvents.find((e) => e.id === id)
    if (resolvedEvt) {
      setHistoryList((prev) => [
        {
          id: `hist-${Date.now()}`,
          title: resolvedEvt.title,
          date: 'Today (Oct 10)',
          dayNumber: 8,
          choiceMade: choice.label,
          impact: choice.impact,
          status: 'Resolved',
        },
        ...prev,
      ])
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <Zap size={24} className="text-accent" aria-hidden="true" />
          <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
            Unexpected Incidents & Dilemmas
          </h1>
        </div>
        <p className="font-body text-xs sm:text-sm text-ink-muted">
          Random life shocks that test your budget resilience. Every decision triggers an immediate ripple across your Oct 28 (Day 26) runway.
        </p>
      </div>

      {/* Active Incidents List */}
      <div className="flex flex-col gap-4">
        {activeEvents.map((event) => (
          <div key={event.id}>
            <EventCard event={event} onResolve={handleResolveEvent} />
          </div>
        ))}
      </div>

      {/* Resolved Incidents Log */}
      <div>
        <ResolvedEventsHistoryCard historyList={historyList} />
      </div>
    </div>
  )
}
