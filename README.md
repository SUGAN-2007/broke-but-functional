# Broke But Functional

> Survive 30 days on ₹10,000. A Gen Z personal finance app that actually gets it.
> Timeline: Oct 3 to Nov 1. Today is Day 8 (Oct 10). Starting budget ₹10,000 + ₹2,000 top-up.

**Tech stack:** React 19 + TypeScript + Vite 8 · Tailwind CSS v4 · shadcn/ui (Radix primitives) · Recharts · framer-motion · React Router 7

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle (npx tsc -b && vite build)
```

---

## Project structure

```
src/
├── components/
│   ├── ui/            # Atomic components (Card, Button, Badge, Input, Dialog, Progress, Skeleton)
│   ├── layout/        # AppShell, Header, Navigation (SidebarRail, BottomNav)
│   ├── dialogs/       # FinanceDialogs (AddIncome, AddBill, AddGoal, Contribute, Resolve, ConfirmReset)
│   └── dashboard/     # AddExpenseDialog
├── pages/             # Dashboard, Calendar, Simulator, Commitments, Goals, Connect, Events, Summary, Settings, NotFound
├── data/
│   └── mock.ts        # Single source of truth (transactions, bills, goals, calendar, connectors, events, forecast)
├── lib/
│   ├── motion.ts      # Typed Framer Motion variants
│   └── utils.ts       # cn(), formatCurrency(), formatPercent()
├── index.css          # Design tokens (CSS variables) + Tailwind v4 @theme inline
└── App.tsx            # React Router setup with lazy-loaded pages + Suspense
```

---

## Design tokens

All colour, radius, shadow, spacing and font values live as **CSS custom properties** in [`src/index.css`](file:///d:/project/Survive/src/index.css). Tailwind v4 consumes them via `@theme inline {}` — so tokens are usable as utility classes (`bg-brand`, `text-ink-muted`, `bg-safe-bg`, `border-border`). No arbitrary hex codes appear in component JSX.

```css
/* Light mode */
:root {
  --brand:   #0F4C3A;   /* forest green  */
  --accent:  #F2A900;   /* marigold      */
  --bg:      #F4EFE6;   /* warm paper cream */
  --ink:     #14231C;   /* dark text     */
  --safe:    #1F9D6B;   /* runway safe   */
  --warning: #E8A317;   /* caution       */
  --danger:  #D8432F;   /* red danger    */
}
/* Dark mode */
.dark {
  --brand:   #5EE0A0;   /* mint green    */
  --accent:  #FFB82E;   /* warm marigold */
  --bg:      #0B1511;   /* deep forest   */
  --ink:     #EDE7DA;   /* warm text     */
}
```

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Dashboard** | 12-column bento grid, liquid balance count-up, ₹200/day daily allowance, Day 26 danger zone forecast, pie category breakdown, recent transactions with "Expensive" and "Auto-synced" tags, Active Event banner. |
| `/calendar` | **Spending Calendar** | 30-day heatmap (Oct 3 – Nov 1) with per-day burn levels, bills-due dots, income markers, "What counts as expensive?" controls, summary strip, and week-by-week mobile fallback. |
| `/simulate` | **Decision Simulator** | Pre-filled Swiggy dinner test, quick scenario chips (Dinner, Headphones, Trip, Phone repair), Before vs After comparison, "Compare Two Decisions" toggle (Buy now vs Wait a week), and confirmation action bar. |
| `/commitments` | **Bills & Subscriptions** | Category icons (Home, Film, Zap, Smartphone, Wifi, Dumbbell), graduated urgency status (red 1-2d, amber 3-7d, neutral 8+d, green paid), Add Bill dialog, and Mark as Paid actions. Unpaid total matches Dashboard (₹1,840). |
| `/goals` | **Savings Goals** | Challenge-sized targets (Headphones ₹2.5k, Cushion ₹1.5k, Goa ₹3k, Course ₹2k), interactive contribution dialog, 3-tier survival allocation protocol, and milestone roadmap. |
| `/connect` | **Connect / Auto-Sync** | **Simulated UI only**: Read-only account aggregator demos, SMS reader, available connector types, 3-step permission flow (zero credentials), "Needs review" inbox, activity logs, and privacy panel. |
| `/events` | **Surprise Incidents** | Unexpected event cards (Phone screen cracked, Friend's birthday, Surprise exam fee) with 3 choice buttons, consequence hints, animated resolution state, and resolved incidents log. |
| `/summary` | **Month Summary** | C+ midpoint grade, key metrics, starting plan vs actual outcome before/after table, category burn progress, discipline wins vs slips, and copyable challenge card. |
| `/settings` | **Settings** | Starting budget editor, start date, expensive sensitivity controls, theme switcher, JSON export/import, and month reset dialog. |
| `*` | **404** | Receipt-styled not-found page with witty copy and direct link back to dashboard. |

---

## Simulated Connectors Note

> [!NOTE]
> The `/connect` page is a purely simulated UI demonstration. No real credentials (usernames, passwords, OTPs, PINs, bank accounts, or cards) are ever accepted or stored. All pipelines operate with mock state in local memory to demonstrate how privacy-first read-only account aggregator feeds would look.

---

## Accessibility & Quality Checklist

- **Semantic HTML**: Proper `main`, `header`, `nav`, `section`, `h1–h3` outline.
- **Skip Link**: Accessible skip-to-main-content link for keyboard users.
- **Live Regions**: `aria-live="polite"` on simulation comparison outputs.
- **Contrast**: WCAG AA verified in both light and dark modes.
- **Touch Targets**: Minimum $44\text{px} \times 44\text{px}$ touch targets across all mobile controls and buttons.
- **Responsive**: Tested fluidly across 360px, 768px, 1024px, and 1440px with no horizontal overflow.
