import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'safe' | 'warning' | 'danger' | 'brand'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  label?: string
}

export function Progress({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  animated = true,
  label,
  className,
  ...props
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  const trackSize = {
    sm: 'h-[4px]',
    md: 'h-[8px]',
    lg: 'h-[12px]',
  }[size]

  const fillColor = {
    default:  'bg-ink-muted',
    safe:     'bg-safe',
    warning:  'bg-warning',
    danger:   'bg-danger',
    brand:    'bg-brand',
  }[variant]

  // Auto-select variant based on percentage
  const autoVariant = variant === 'default'
    ? pct > 80 ? 'danger' : pct > 60 ? 'warning' : 'brand'
    : variant

  const autoFill = {
    default:  'bg-brand',
    safe:     'bg-safe',
    warning:  'bg-warning',
    danger:   'bg-danger',
    brand:    'bg-brand',
  }[autoVariant]

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-label={label}
      className={cn('w-full', className)}
      {...props}
    >
      <div className={cn('w-full rounded-full bg-border overflow-hidden', trackSize)}>
        <div
          className={cn(
            'h-full rounded-full',
            variant === 'default' ? autoFill : fillColor,
            animated && 'transition-all duration-700 ease-out'
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
