import * as React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'safe' | 'warning' | 'danger' | 'muted' | 'brand' | 'accent' | 'neutral'
type StampVariant = 'paid' | 'due' | 'overdue' | 'pending'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'muted', children, ...props }: BadgeProps) {
  const variantClass = {
    safe:    'bg-safe-bg text-safe border border-safe',
    warning: 'bg-warning-bg text-warning border border-warning',
    danger:  'bg-danger-bg text-danger border border-danger',
    muted:   'bg-surface-raised text-ink-muted border border-border',
    neutral: 'bg-surface-raised text-ink-muted border border-border',
    brand:   'bg-brand text-brand-fg border border-brand',
    accent:  'bg-accent text-accent-fg border border-accent',
  }[variant]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5',
        'rounded-full',
        'font-mono text-[0.6875rem] font-[600] uppercase tracking-[0.08em]',
        variantClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

interface StampProps {
  variant: StampVariant
  className?: string
}

export function Stamp({ variant, className }: StampProps) {
  const config = {
    paid:    { label: 'PAID',          cls: 'stamp-paid' },
    due:     { label: 'DUE',           cls: 'stamp-due' },
    overdue: { label: 'OVERDUE',       cls: 'stamp-overdue' },
    pending: { label: 'PENDING',       cls: 'stamp-pending' },
  }[variant]

  return (
    <span className={cn('stamp', config.cls, className)}>
      {config.label}
    </span>
  )
}
