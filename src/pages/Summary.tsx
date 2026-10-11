import { monthSummary, heroData, categories } from '@/data'
import { getDateForDay } from '@/lib/format'
import { SummaryGradeCard } from '@/components/summary/SummaryGradeCard'
import { SummaryMetricsGrid } from '@/components/summary/SummaryMetricsGrid'
import { PlanVsActualCard } from '@/components/summary/PlanVsActualCard'
import { CategoryBreakdownCard } from '@/components/summary/CategoryBreakdownCard'
import { WinsAndMistakesCard } from '@/components/summary/WinsAndMistakesCard'
import { ShareableRecapCard } from '@/components/summary/ShareableRecapCard'

export default function Summary() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
          Challenge Midpoint Verdict & Summary
        </h1>
        <p className="font-body text-xs sm:text-sm text-ink-muted mt-1">
          {getDateForDay(8)} (Day 8 of 30) audit. Starting plan vs actual burn velocity analysis.
        </p>
      </div>

      {/* Grade + stats row */}
      <div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          <SummaryGradeCard grade={monthSummary.grade} />
          <SummaryMetricsGrid monthSummary={monthSummary} heroData={heroData} />
        </div>
      </div>

      {/* Starting plan vs actual outcome (Insolvency Horizon with stacked labels) */}
      <div>
        <PlanVsActualCard heroData={heroData} />
      </div>

      {/* Category breakdown (Rent shown in neutral style) */}
      <div>
        <CategoryBreakdownCard
          categories={categories}
          totalSpent={monthSummary.totalSpent}
        />
      </div>

      {/* Wins + Mistakes + Best/Worst days */}
      <div>
        <WinsAndMistakesCard monthSummary={monthSummary} />
      </div>

      {/* Shareable Recap Card */}
      <div>
        <ShareableRecapCard shareTagline={monthSummary.shareTagline} />
      </div>
    </div>
  )
}
