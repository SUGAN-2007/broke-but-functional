import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import { events as initialEvents, resolvedEventsHistory } from '@/data'
import type { FinanceEvent, EventChoice, ResolvedEventHistory } from '@/types/finance'
import { fadeUp } from '@/lib/motion'
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

      {/* Resolved Incidents Log */}
      <motion.div variants={fadeUp}>
        <ResolvedEventsHistoryCard historyList={historyList} />
      </motion.div>
    </motion.div>
  )
}
