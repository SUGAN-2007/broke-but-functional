import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '@/lib/motion'
import { ActiveEventBanner } from '@/components/dashboard/ActiveEventBanner'
import { DashboardHeroCard } from '@/components/dashboard/DashboardHeroCard'
import { CommittedBillsCard } from '@/components/dashboard/CommittedBillsCard'
import { ProjectedMonthEndCard } from '@/components/dashboard/ProjectedMonthEndCard'
import { HealthScoreCard } from '@/components/dashboard/HealthScoreCard'
import { ForecastChartCard } from '@/components/dashboard/ForecastChartCard'
import { CategorySpendCard } from '@/components/dashboard/CategorySpendCard'
import { RecentTransactionsCard } from '@/components/dashboard/RecentTransactionsCard'
import { InsightsSection } from '@/components/dashboard/InsightsSection'
import { AddExpenseDialog } from '@/components/dialogs/AddExpenseDialog'
import { AddIncomeDialog } from '@/components/dialogs/AddIncomeDialog'

export default function Dashboard() {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false)
  const [addIncomeOpen, setAddIncomeOpen] = useState(false)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h1 className="sr-only">Dashboard — Broke But Functional</h1>

      {/* Active Incident Banner */}
      <motion.div variants={fadeUp}>
        <ActiveEventBanner />
      </motion.div>

      {/* 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Row 1: Hero Card (6 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-6">
          <DashboardHeroCard
            onAddExpense={() => setAddExpenseOpen(true)}
            onAddIncome={() => setAddIncomeOpen(true)}
          />
        </motion.div>

        {/* Row 1: Committed Bills (3 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-3">
          <CommittedBillsCard />
        </motion.div>

        {/* Row 1: Projected Month-End (3 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-1 lg:col-span-3">
          <ProjectedMonthEndCard />
        </motion.div>

        {/* Row 2: Financial Health (4 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4">
          <HealthScoreCard />
        </motion.div>

        {/* Row 2: Forecast Chart (8 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-8">
          <ForecastChartCard />
        </motion.div>

        {/* Row 3: Category Breakdown (4 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-4">
          <CategorySpendCard />
        </motion.div>

        {/* Row 3: Recent Transactions (8 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-8">
          <RecentTransactionsCard />
        </motion.div>

        {/* Row 4: Insights (12 cols) */}
        <motion.div variants={fadeUp} className="md:col-span-2 lg:col-span-12">
          <InsightsSection />
        </motion.div>
      </div>

      {/* Quick Action Dialogs */}
      <AddExpenseDialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen} />
      <AddIncomeDialog open={addIncomeOpen} onOpenChange={setAddIncomeOpen} />
    </motion.div>
  )
}
