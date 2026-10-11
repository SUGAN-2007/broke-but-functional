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

export function getDateForDay(dayNumber: number): string {
  if (dayNumber <= 0) return 'Oct 3'
  if (dayNumber <= 29) {
    return `Oct ${dayNumber + 2}`
  }
  return `Nov ${dayNumber - 29}`
}

export function getDayForDate(dateStr: string): number | null {
  const octMatch = dateStr.match(/Oct\s+(\d+)/i)
  if (octMatch) {
    const dayOfMonth = parseInt(octMatch[1], 10)
    return dayOfMonth - 2
  }
  const novMatch = dateStr.match(/Nov\s+(\d+)/i)
  if (novMatch) {
    const dayOfMonth = parseInt(novMatch[1], 10)
    return dayOfMonth + 29
  }
  return null
}

export function formatDayWithDate(dayNumber: number, total = 30): string {
  return `${getDateForDay(dayNumber)} (Day ${dayNumber} of ${total})`
}

export function formatDayBadge(dayNumber: number): string {
  return `${getDateForDay(dayNumber)} (Day ${dayNumber})`
}

export function getDayLabel(day: number, total: number): string {
  return `${getDateForDay(day)} (Day ${day} of ${total})`
}
