import { useState } from 'react'
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
    <div className="flex flex-col gap-5 sm:gap-6">
      <h1 className="sr-only">Dashboard — Broke But Functional</h1>

      {/* Active Incident Banner - Above the fold, stable min-height */}
      <div className="min-h-[64px]">
        <ActiveEventBanner />
      </div>

      {/* 12-Column Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5">
        {/* Row 1: Hero Card (6 cols) - CRITICAL LCP ELEMENT (Immediate Paint, Zero Delay) */}
        <div className="md:col-span-2 lg:col-span-6 min-h-[220px]">
          <DashboardHeroCard
            onAddExpense={() => setAddExpenseOpen(true)}
            onAddIncome={() => setAddIncomeOpen(true)}
          />
        </div>

        {/* Row 1: Committed Bills (3 cols) */}
        <div className="md:col-span-1 lg:col-span-3 min-h-[220px]">
          <CommittedBillsCard />
        </div>

        {/* Row 1: Projected Month-End (3 cols) */}
        <div className="md:col-span-1 lg:col-span-3 min-h-[220px]">
          <ProjectedMonthEndCard />
        </div>

        {/* Row 2: Financial Health (4 cols) */}
        <div className="md:col-span-2 lg:col-span-4 min-h-[260px]">
          <HealthScoreCard />
        </div>

        {/* Row 2: Forecast Chart (8 cols) */}
        <div className="md:col-span-2 lg:col-span-8 min-h-[260px]">
          <ForecastChartCard />
        </div>

        {/* Row 3: Category Breakdown (4 cols) - Below the fold */}
        <div className="md:col-span-2 lg:col-span-4 content-visibility-auto min-h-[300px]">
          <CategorySpendCard />
        </div>

        {/* Row 3: Recent Transactions (8 cols) - Below the fold */}
        <div className="md:col-span-2 lg:col-span-8 content-visibility-auto min-h-[300px]">
          <RecentTransactionsCard />
        </div>

        {/* Row 4: Insights (12 cols) - Below the fold */}
        <div className="md:col-span-2 lg:col-span-12 content-visibility-auto min-h-[160px]">
          <InsightsSection />
        </div>
      </div>

      {/* Quick Action Dialogs */}
      <AddExpenseDialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen} />
      <AddIncomeDialog open={addIncomeOpen} onOpenChange={setAddIncomeOpen} />
    </div>
  )
}

