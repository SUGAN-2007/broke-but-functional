import { Card } from '@/components/ui/card'
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react'
import { insights } from '@/data/selectors'

export function InsightsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {insights.map((ins) => (
        <Card key={ins.id} hover className="p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {ins.type === 'warning' ? (
                <AlertTriangle size={16} className="text-danger" />
              ) : ins.type === 'good' ? (
                <CheckCircle2 size={16} className="text-safe" />
              ) : (
                <Sparkles size={16} className="text-accent" />
              )}
              <span className="font-display font-bold text-xs text-ink">{ins.headline}</span>
            </div>
            <p className="font-body text-xs text-ink-muted leading-relaxed">{ins.body}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
