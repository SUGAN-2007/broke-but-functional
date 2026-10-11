import { Sun, Moon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

interface AppearanceCardProps {
  isDark: boolean
  onToggleDark: (val: boolean) => void
}

export function AppearanceCard({ isDark, onToggleDark }: AppearanceCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display font-[700] text-sm text-ink">Appearance & Mode</h2>
        <div className="flex items-center gap-2">
          <Sun size={14} className={!isDark ? 'text-accent' : 'text-ink-muted'} />
          <Switch checked={isDark} onCheckedChange={onToggleDark} />
          <Moon size={14} className={isDark ? 'text-brand' : 'text-ink-muted'} />
        </div>
      </div>
      <p className="font-body text-xs text-ink-muted mb-3">
        Light mode (Paper cream & forest green) vs Dark mode (Night market black).
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggleDark(false)}
          className={[
            'flex items-center gap-2 px-4 py-2.5 rounded-[12px] border text-xs font-semibold transition-all cursor-pointer',
            !isDark ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand' : 'border-border text-ink-muted hover:text-ink',
          ].join(' ')}
        >
          <Sun size={15} /> Light (Paper Cream)
        </button>

        <button
          type="button"
          onClick={() => onToggleDark(true)}
          className={[
            'flex items-center gap-2 px-4 py-2.5 rounded-[12px] border text-xs font-semibold transition-all cursor-pointer',
            isDark ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand' : 'border-border text-ink-muted hover:text-ink',
          ].join(' ')}
        >
          <Moon size={15} /> Dark (Deep Forest)
        </button>
      </div>
    </Card>
  )
}
