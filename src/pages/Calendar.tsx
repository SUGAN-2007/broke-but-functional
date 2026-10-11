import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/motion'
import { Badge } from '@/components/ui/badge'
import { calendarDays, heroData, type CalendarDay } from '@/data/selectors'
import { CalendarSummaryCards } from '@/components/calendar/CalendarSummaryCards'
import { CalendarControlsBar } from '@/components/calendar/CalendarControlsBar'
import { CalendarGrid } from '@/components/calendar/CalendarGrid'
import { DayDetailPanel } from '@/components/calendar/DayDetailPanel'
import { AddExpenseDialog } from '@/components/dialogs/AddExpenseDialog'

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<CalendarDay>(
    () => calendarDays.find((d) => d.isToday) || calendarDays[7]
  )
  const [purchaseThreshold, setPurchaseThreshold] = useState('500')
  const [dayMultiplier, setDayMultiplier] = useState<'1.25' | '1.5' | '2'>('1.5')
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)
  const [dialogDate, setDialogDate] = useState<string>('')

  const handleOpenAddExpense = (dateStr: string) => {
    setDialogDate(dateStr)
    setAddExpenseOpen(true)
  }

  const handleResetToday = () => {
    setSelectedDay(calendarDays.find((d) => d.isToday) || calendarDays[7])
  }

  const mult = parseFloat(dayMultiplier)
  const expensiveLimit = heroData.dailyAllowance * mult

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
              Spending Heatmap & Calendar
            </h1>
            <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
              At-a-glance visibility into expensive burn days, upcoming bills, and no-spend milestones.
            </p>
          </div>
          <Badge variant="warning" className="self-start sm:self-auto text-xs py-1 px-2.5">
            Daily Allowance: ₹{heroData.dailyAllowance}/day
          </Badge>
        </div>
      </motion.div>

      {/* Month Summary Strip (Discretionary vs Fixed Exclusions) */}
      <motion.div variants={fadeUp}>
        <CalendarSummaryCards dayMultiplier={dayMultiplier} />
      </motion.div>

      {/* Configuration & Threshold Definition Bar */}
      <motion.div variants={fadeUp}>
        <CalendarControlsBar
          purchaseThreshold={purchaseThreshold}
          onPurchaseThresholdChange={setPurchaseThreshold}
          dayMultiplier={dayMultiplier}
          onDayMultiplierChange={setDayMultiplier}
        />
      </motion.div>

      {/* Main Grid: Heatmap + Selected Day Details */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Mon-Sun Grid (8 cols) */}
        <div className="lg:col-span-8">
          <CalendarGrid
            days={calendarDays}
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            expensiveLimit={expensiveLimit}
            dailyAllowance={heroData.dailyAllowance}
          />
        </div>

        {/* Selected Day Detail Panel (4 cols) */}
        <div className="lg:col-span-4">
          <DayDetailPanel
            selectedDay={selectedDay}
            onResetToday={handleResetToday}
            onAddExpenseForDay={handleOpenAddExpense}
            purchaseThreshold={parseFloat(purchaseThreshold) || 500}
          />
        </div>
      </motion.div>

      {/* Add Expense for Selected Day Dialog */}
      <AddExpenseDialog
        open={addExpenseOpen}
        onOpenChange={setAddExpenseOpen}
        defaultDate={dialogDate}
      />
    </motion.div>
  )
}
