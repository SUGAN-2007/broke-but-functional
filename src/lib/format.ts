/**
 * Currency and date formatting utilities.
 * Crucial rule: Negatives format as -₹320, NEVER ₹-320.
 */

export function formatCurrency(amount: number, compact = false): string {
  if (isNaN(amount)) return '₹0'
  const isNegative = amount < 0
  const abs = Math.abs(amount)

  if (compact && abs >= 1000) {
    const compactVal = `${(abs / 1000).toFixed(1)}k`
    return isNegative ? `-₹${compactVal}` : `₹${compactVal}`
  }

  const formatted = abs.toLocaleString('en-IN')
  return isNegative ? `-₹${formatted}` : `₹${formatted}`
}

export function formatPercent(value: number, total: number): number {
  if (!total || total <= 0) return 0
  return Math.min(100, Math.round((value / total) * 100))
}

export function formatDate(dayNumber: number, includeDayNum = true, total = 30): string {
  if (dayNumber <= 0) return 'Oct 3'
  const dateStr = dayNumber <= 29 ? `Oct ${dayNumber + 2}` : `Nov ${dayNumber - 29}`
  if (!includeDayNum) return dateStr
  return `${dateStr} (Day ${dayNumber} of ${total})`
}

export function formatDelta(amount: number, unit = ''): string {
  if (amount === 0) return '₹0'
  const isNegative = amount < 0
  const prefix = isNegative ? '-' : '+'
  const formatted = Math.abs(amount).toLocaleString('en-IN')
  return `${prefix}₹${formatted}${unit}`
}

export function getDateForDay(dayNumber: number): string {
  if (dayNumber <= 0) return 'Oct 3'
  if (dayNumber <= 29) return `Oct ${dayNumber + 2}`
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
