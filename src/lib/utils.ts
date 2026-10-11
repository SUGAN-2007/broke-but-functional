import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, compact = false): string {
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatPercent(value: number, total: number): number {
  return Math.round((value / total) * 100)
}

export function getDayLabel(day: number, total: number): string {
  return `Day ${day} of ${total}`
}
