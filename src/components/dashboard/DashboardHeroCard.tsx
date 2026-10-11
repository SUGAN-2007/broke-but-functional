import { Card, CardLabel, CardValue } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Plus } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { formatCurrency, getDateForDay } from '@/lib/format'

export interface DashboardHeroCardProps {
  onAddExpense: () => void
  onAddIncome: () => void
}

export function DashboardHeroCard({ onAddExpense, onAddIncome }: DashboardHeroCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between p-5 sm:p-6 relative overflow-hidden">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-wider text-ink font-bold">
              {getDateForDay(heroData.day)} (Day {heroData.day} of {heroData.totalDays})
            </span>
            <span className="text-border-strong">•</span>
            <span className="text-xs text-ink-muted font-body">Oct 3 – Nov 1</span>
          </div>
          <Badge variant="danger" className="font-bold text-xs">
            <AlertTriangle size={11} className="mr-1" />
            Red by {getDateForDay(heroData.dangerDay)} (Day {heroData.dangerDay})
          </Badge>
        </div>

        <div className="mt-2">
          <CardLabel>Remaining Liquid Balance</CardLabel>
          <div className="flex items-baseline gap-2 mt-1 mb-2">
            <CardValue size="hero" className="text-ink tracking-tight font-mono">
              {formatCurrency(heroData.balance)}
            </CardValue>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span>Start: ₹{heroData.startingBalance.toLocaleString('en-IN')}</span>
            <span>+ ₹{heroData.incomeTopUp.toLocaleString('en-IN')} top-up</span>
            <span>- ₹{heroData.startingBalance + heroData.incomeTopUp - heroData.balance} spent</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <CardLabel>Calculated Daily Allowance</CardLabel>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-mono font-[700] text-2xl text-ink tracking-tight">
              {formatCurrency(heroData.dailyAllowance)}
            </span>
            <span className="text-xs font-medium text-ink-muted font-body">/day</span>
            <span className="text-[11px] text-ink-muted ml-2">
              (₹{heroData.balance} - ₹{heroData.unpaidBills}) ÷ {heroData.daysLeft}d
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={onAddExpense}
            className="gap-1.5 text-xs font-semibold"
          >
            <Plus size={14} /> Log Expense
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onAddIncome}
            className="gap-1.5 text-xs font-semibold"
          >
            + Income
          </Button>
        </div>
      </div>
    </Card>
  )
}
