import * as React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  raised?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, raised = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)]',
          'shadow-[var(--shadow-card)] transition-all duration-200',
          hover && 'cursor-pointer hover:translate-y-[-2px] hover:shadow-[var(--shadow-raised)]',
          raised && 'bg-surface-raised shadow-[var(--shadow-raised)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'

interface CardLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardLabel = React.forwardRef<HTMLParagraphElement, CardLabelProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        'font-body text-[0.8125rem] font-[500] uppercase tracking-[0.06em] text-ink-muted',
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
)
CardLabel.displayName = 'CardLabel'

interface CardValueProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'hero' | 'lg' | 'md' | 'sm'
}

export const CardValue = React.forwardRef<HTMLParagraphElement, CardValueProps>(
  ({ className, size = 'md', children, ...props }, ref) => {
    const sizeClass = {
      hero: 'text-[clamp(2.75rem,8vw+1rem,5.5rem)] font-[800] tracking-[-0.03em]',
      lg: 'text-[clamp(1.75rem,3vw+1rem,2.5rem)] font-[700] tracking-[-0.02em]',
      md: 'text-[clamp(1.25rem,2vw,1.75rem)] font-[600] tracking-[-0.02em]',
      sm: 'text-[1.125rem] font-[600]',
    }[size]

    return (
      <p
        ref={ref}
        className={cn(
          'font-display mono tabular',
          sizeClass,
          'text-ink',
          className
        )}
        {...props}
      >
        {children}
      </p>
    )
  }
)
CardValue.displayName = 'CardValue'
