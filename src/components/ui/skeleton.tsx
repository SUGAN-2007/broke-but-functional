import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-border/70',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)] shadow-[var(--shadow-card)]">
      <Skeleton className="h-[0.8125rem] w-[40%] mb-3" />
      <Skeleton className="h-[2.5rem] w-[60%] mb-4" />
      <Skeleton className="h-[0.8125rem] w-[80%]" />
    </div>
  )
}

export function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-3 py-3">
      <Skeleton className="h-10 w-10 rounded-[10px] shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton className="h-[0.875rem] w-[55%]" />
        <Skeleton className="h-[0.75rem] w-[35%]" />
      </div>
      <Skeleton className="h-[1.125rem] w-[20%] ml-auto" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[var(--grid-gap)]">
      {/* Hero */}
      <div className="lg:col-span-7 rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)] shadow-[var(--shadow-card)]">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-20 w-64 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      {/* Stats */}
      <div className="lg:col-span-5 grid grid-cols-2 gap-[var(--grid-gap)]">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      {/* Chart */}
      <div className="lg:col-span-8 rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)]">
        <Skeleton className="h-4 w-40 mb-4" />
        <Skeleton className="h-[220px] w-full rounded-[12px]" />
      </div>
      {/* Donut */}
      <div className="lg:col-span-4 rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)]">
        <Skeleton className="h-4 w-36 mb-4" />
        <Skeleton className="h-[220px] w-full rounded-full mx-auto max-w-[200px]" />
      </div>
    </div>
  )
}

export function GoalSkeleton({ count = 3 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-[20px] border border-border bg-surface p-[clamp(1rem,2vw,1.75rem)]"
        >
          <div className="flex justify-between mb-4">
            <Skeleton className="h-10 w-10 rounded-[10px]" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-5 w-[50%] mb-1" />
          <Skeleton className="h-4 w-[35%] mb-4" />
          <Skeleton className="h-2 w-full rounded-full mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[30%]" />
            <Skeleton className="h-4 w-[25%]" />
          </div>
        </div>
      ))}
    </>
  )
}
