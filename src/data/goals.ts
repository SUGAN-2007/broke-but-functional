import type { Goal } from '@/types/finance'

export const goals: Goal[] = [
  {
    id: 'goal-001',
    name: 'Noise-Cancelling Headphones',
    targetAmount: 2500,
    currentAmount: 800,
    category: 'Gear',
    targetDate: 'Oct 30',
    icon: 'Headphones',
    priority: 'high',
    status: 'on-track',
  },
  {
    id: 'goal-002',
    name: 'Emergency Buffer Cushion',
    targetAmount: 1500,
    currentAmount: 1000,
    category: 'Safety',
    targetDate: 'Oct 24',
    icon: 'Shield',
    priority: 'high',
    status: 'on-track',
  },
  {
    id: 'goal-003',
    name: 'Goa Weekend Trip Fund',
    targetAmount: 4000,
    currentAmount: 100,
    category: 'Travel',
    targetDate: 'Oct 30', // Target date inside challenge as required
    icon: 'Plane',
    priority: 'low',
    status: 'at-risk',
  },
]

export const goalMilestones = [
  { title: 'Emergency Cushion ₹1,000 (66%)', date: 'Expected Oct 16 (Day 14)', done: false },
  { title: 'Headphones halfway mark (₹1,250)', date: 'Expected Oct 20 (Day 18)', done: false },
  { title: 'Course fee buffer unlocked', date: 'Oct 28 (Day 26) clearance', done: false },
]
