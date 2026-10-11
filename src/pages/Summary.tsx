import { motion } from 'framer-motion'
import { monthSummary, heroData, categories } from '@/data'
import { getDateForDay } from '@/lib/format'
import { fadeUp } from '@/lib/motion'
import { SummaryGradeCard } from '@/components/summary/SummaryGradeCard'
import { SummaryMetricsGrid } from '@/components/summary/SummaryMetricsGrid'
import { PlanVsActualCard } from '@/components/summary/PlanVsActualCard'
import { CategoryBreakdownCard } from '@/components/summary/CategoryBreakdownCard'
import { WinsAndMistakesCard } from '@/components/summary/WinsAndMistakesCard'
import { ShareableRecapCard } from '@/components/summary/ShareableRecapCard'

export default function Summary() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
          Challenge Midpoint Verdict & Summary
        </h1>
        <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
          {getDateForDay(8)} (Day 8 of 30) audit. Starting plan vs actual burn velocity analysis.
        </p>
      </motion.div>

      {/* Grade + stats row */}
      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          <SummaryGradeCard grade={monthSummary.grade} />
          <SummaryMetricsGrid monthSummary={monthSummary} heroData={heroData} />
        </div>
      </motion.div>

      {/* Starting plan vs actual outcome (Insolvency Horizon with stacked labels) */}
      <motion.div variants={fadeUp}>
        <PlanVsActualCard heroData={heroData} />
      </motion.div>

      {/* Category breakdown (Rent shown in neutral style) */}
      <motion.div variants={fadeUp}>
        <CategoryBreakdownCard
          categories={categories}
          totalSpent={monthSummary.totalSpent}
        />
      </motion.div>

      {/* Wins + Mistakes + Best/Worst days */}
      <motion.div variants={fadeUp}>
        <WinsAndMistakesCard monthSummary={monthSummary} />
      </motion.div>

      {/* Shareable Recap Card */}
      <motion.div variants={fadeUp}>
        <ShareableRecapCard shareTagline={monthSummary.shareTagline} />
      </motion.div>
    </motion.div>
  )
}
