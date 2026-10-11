import type { FinanceEvent, ResolvedEventHistory } from '@/types/finance'

export const events: FinanceEvent[] = [
  {
    id: 'evt-001',
    title: 'Phone screen cracked',
    description: 'Slipped on metro stairs. Screen glass shattered but touch works. Local repair shop quoted ₹1,500.',
    amount: 1500,
    severity: 'high',
    choices: [
      {
        label: 'Pay now (₹1,500)',
        tag: 'repair',
        consequence: 'Instant fix. Daily allowance plunges from ₹200 to ₹131.',
        impact: -1500,
      },
      {
        label: 'Defer 2 weeks',
        tag: 'defer',
        consequence: 'Use screen tape. Protect cash until Oct 24 (Day 22).',
        impact: 0,
      },
      {
        label: 'Borrow backup phone',
        tag: 'skip',
        consequence: 'Use roommate spare phone. Zero financial cost.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-002',
    title: "Friend's birthday dinner",
    description: "Rohan's turning 22. Group plan is dinner at Big Chill Cafe. Your split estimate is ₹800.",
    amount: 800,
    severity: 'medium',
    choices: [
      {
        label: 'Attend & Pay (₹800)',
        tag: 'social',
        consequence: 'Great memories, but eats 4 days worth of daily allowance.',
        impact: -800,
      },
      {
        label: 'Only drinks/dessert',
        tag: 'counter',
        consequence: 'Show up, celebrate, order just dessert for ₹250.',
        impact: -250,
      },
      {
        label: 'Skip with excuse',
        tag: 'skip',
        consequence: 'Save all ₹800. FOMO for 2 days, balance safe.',
        impact: 0,
      },
    ],
  },
  {
    id: 'evt-003',
    title: 'Surprise exam fee',
    description: 'The university announced a ₹600 semester certification fee, due Oct 18.',
    amount: 600,
    severity: 'high',
    choices: [
      {
        label: 'Pay now (₹600)',
        tag: 'mandatory',
        consequence: 'Academic clearance secured. -₹600 deducted from surplus.',
        impact: -600,
      },
      {
        label: 'Late fee window',
        tag: 'defer',
        consequence: 'Pay next month with ₹100 penalty. Frees up cash this week.',
        impact: 0,
      },
      {
        label: 'Request fee waiver',
        tag: 'waiver',
        consequence: 'Submit departmental application. 50% chance of approval.',
        impact: 0,
      },
    ],
  },
]

export const resolvedEventsHistory: ResolvedEventHistory[] = [
  {
    id: 'evt-hist-1',
    title: 'Metro card lost',
    date: 'Oct 5 (Day 3)',
    dayNumber: 3,
    choiceMade: 'Bought new card (₹200)',
    impact: -200,
    status: 'Resolved',
  },
  {
    id: 'evt-hist-2',
    title: 'Group project printouts',
    date: 'Oct 7 (Day 5)',
    dayNumber: 5,
    choiceMade: 'Split 4 ways (₹95)',
    impact: -95,
    status: 'Resolved',
  },
]
