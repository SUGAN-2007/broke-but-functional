import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'min-h-[44px] rounded-[12px]',
    'font-body font-[600] text-[0.9375rem]',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-40',
    'cursor-pointer select-none',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-brand-fg hover:bg-brand-hover active:scale-[0.98]',
        accent:
          'bg-accent text-accent-fg hover:bg-accent-hover active:scale-[0.98]',
        outline:
          'border border-border bg-transparent text-ink hover:bg-surface-raised active:scale-[0.98]',
        ghost:
          'bg-transparent text-ink-muted hover:text-ink hover:bg-surface active:scale-[0.98]',
        danger:
          'bg-danger-bg text-danger border border-danger hover:bg-danger hover:text-white active:scale-[0.98]',
        warning:
          'bg-warning-bg text-warning border border-warning hover:bg-warning hover:text-white active:scale-[0.98]',
        safe:
          'bg-safe-bg text-safe border border-safe hover:bg-safe hover:text-white active:scale-[0.98]',
      },
      size: {
        sm: 'h-[36px] px-3 text-[0.8125rem]',
        md: 'h-[44px] px-5',
        lg: 'h-[52px] px-7 text-[1rem]',
        icon: 'h-[44px] w-[44px] p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

