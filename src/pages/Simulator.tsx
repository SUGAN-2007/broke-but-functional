import { useState } from 'react'
import { Calculator, GitCompare } from 'lucide-react'
import { heroData } from '@/data/selectors'
import { SimulatorFormCard } from '@/components/simulator/SimulatorFormCard'
import { SimulationResultCard } from '@/components/simulator/SimulationResultCard'
import { SimulatorEngineExplanation } from '@/components/simulator/SimulatorEngineExplanation'
import type { RiskLevel } from '@/types/finance'

export default function Simulator() {
  const [item, setItem] = useState('Swiggy dinner')
  const [amount, setAmount] = useState('1200')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('2026-10-10')
  const [compareMode, setCompareMode] = useState(false)
  const [decisionConfirmed, setDecisionConfirmed] = useState(false)

  const amt = parseFloat(amount) || 0
  const currentLiquid = heroData.balance
  const newBalance = Math.max(-1000, currentLiquid - amt)

  const newAllowance = Math.max(0, Math.round((newBalance - heroData.unpaidBills) / heroData.daysLeft))
  const dangerDayShift = amt >= 2000 ? 5 : amt >= 1000 ? 3 : amt >= 500 ? 1 : 0
  const simulatedDangerDay = Math.max(8, heroData.dangerDay - dangerDayShift)
  const simulatedHealthScore = Math.max(20, heroData.healthScore - (amt >= 2000 ? 18 : amt >= 1000 ? 10 : 5))

  const beforeRisk: RiskLevel = 'Danger'
  const afterRisk: RiskLevel = amt >= 1000 || simulatedDangerDay <= 23 ? 'Critical' : 'Danger'

  const handleApplyScenario = (scenario: { label: string; amount: number; category: string }) => {
    setItem(scenario.label)
    setAmount(scenario.amount.toString())
    setCategory(scenario.category)
    setDecisionConfirmed(false)
  }

  const handleReset = () => {
    setItem('')
    setAmount('0')
    setDecisionConfirmed(false)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calculator size={22} className="text-brand" aria-hidden="true" />
            <h1 className="font-display font-[800] text-2xl sm:text-3xl text-ink tracking-tight">
              Decision & Purchase Simulator
            </h1>
          </div>
          <p className="font-body text-xs sm:text-sm text-ink-muted">
            Test discretionary expenses before spending. See real-time impact on your ₹0 danger day.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCompareMode((c) => !c)}
          className={[
            'self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-[10px] border text-xs font-semibold transition-all cursor-pointer',
            compareMode
              ? 'bg-brand text-brand-fg border-brand'
              : 'bg-surface border-border text-ink hover:bg-surface-raised',
          ].join(' ')}
          aria-pressed={compareMode}
        >
          <GitCompare size={14} />
          <span>{compareMode ? 'Comparing 2 Scenarios' : 'Compare Two Decisions'}</span>
        </button>
      </div>

      {/* Main Grid: Form + Simulator Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Input Form (5 cols) */}
        <div className="lg:col-span-5">
          <SimulatorFormCard
            item={item}
            onItemChange={setItem}
            amount={amount}
            onAmountChange={setAmount}
            category={category}
            onCategoryChange={setCategory}
            date={date}
            onDateChange={setDate}
            onApplyScenario={handleApplyScenario}
          />
        </div>

        {/* Right: Simulation Output Card (7 cols) */}
        <div className="lg:col-span-7">
          <SimulationResultCard
            item={item}
            amt={amt}
            newBalance={newBalance}
            newAllowance={newAllowance}
            dangerDayShift={dangerDayShift}
            simulatedDangerDay={simulatedDangerDay}
            simulatedHealthScore={simulatedHealthScore}
            beforeRisk={beforeRisk}
            afterRisk={afterRisk}
            compareMode={compareMode}
            decisionConfirmed={decisionConfirmed}
            onConfirmDecision={() => setDecisionConfirmed(true)}
            onCancel={handleReset}
          />
        </div>
      </div>

      {/* Explanation Rules */}
      <div className="mt-2">
        <SimulatorEngineExplanation />
      </div>
    </div>
  )
}
