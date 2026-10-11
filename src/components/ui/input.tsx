import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body text-[0.8125rem] font-[500] uppercase tracking-[0.06em] text-ink-muted"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-[44px] px-4 py-2.5',
            'rounded-[12px] border bg-surface-raised',
            'font-body text-ink placeholder:text-ink-muted',
            'transition-all duration-150',
            error
              ? 'border-danger focus:ring-2 focus:ring-danger/40 focus:outline-none'
              : 'border-border focus:ring-2 focus:ring-brand/40 focus:border-brand focus:outline-none',
            className
          )}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-[0.8125rem] text-danger font-[500]" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[0.8125rem] text-ink-muted">
            {hint}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: { value: string; label: string }[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="font-body text-[0.8125rem] font-[500] uppercase tracking-[0.06em] text-ink-muted"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full min-h-[44px] px-4 py-2.5 appearance-none',
            'rounded-[12px] border bg-surface-raised',
            'font-body text-ink',
            'transition-all duration-150 cursor-pointer',
            error
              ? 'border-danger focus:ring-2 focus:ring-danger/40 focus:outline-none'
              : 'border-border focus:ring-2 focus:ring-brand/40 focus:border-brand focus:outline-none',
            className
          )}
          aria-invalid={!!error}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-[0.8125rem] text-danger font-[500]" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
