import { Card } from '@/components/ui/card'

interface SummaryGradeCardProps {
  grade: string
}

export function SummaryGradeCard({ grade }: SummaryGradeCardProps) {
  const colors: Record<string, string> = {
    'A+': 'text-safe border-safe bg-safe-bg',
    'A':  'text-safe border-safe bg-safe-bg',
    'B+': 'text-brand border-brand bg-brand/10',
    'B':  'text-brand border-brand bg-brand/10',
    'C+': 'text-warning border-warning bg-warning-bg',
    'C':  'text-warning border-warning bg-warning-bg',
    'D':  'text-danger border-danger bg-danger-bg',
    'F':  'text-danger border-danger bg-danger-bg',
  }

  return (
    <Card className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 gap-3">
      <div
        className={[
          'w-24 h-24 rounded-[22px] border-2 flex flex-col items-center justify-center shadow-xs',
          colors[grade] ?? 'text-ink border-border bg-surface-raised',
        ].join(' ')}
      >
        <span className="font-display font-[800] text-[3.2rem] leading-none tracking-[-0.04em]">
          {grade}
        </span>
      </div>
      <div>
        <p className="font-display font-[700] text-base text-ink">Mid-Challenge Grade</p>
        <p className="font-body text-xs text-ink-muted mt-0.5 leading-relaxed">
          Surviving with scratches. Food delivery is threatening the final week.
        </p>
      </div>
    </Card>
  )
}
