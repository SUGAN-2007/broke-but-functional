# Broke But Functional

> Survive 30 days on ₹10,000. A Gen Z personal finance app that actually gets it.

**Tech stack:** React 19 + TypeScript + Vite 8 · Tailwind CSS v4 · shadcn/ui (Radix primitives) · Recharts · framer-motion · React Router 6

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production bundle
```

---

## Project structure

```
src/
├── components/
│   ├── ui/            # Atomic components (Card, Button, Badge, Input, Dialog, Progress, Skeleton)
│   ├── layout/        # AppShell, SidebarRail, BottomNav
│   └── dashboard/     # AddExpenseDialog
├── pages/             # Dashboard, Simulator, Commitments, Goals, Events, Summary, NotFound
├── data/
│   └── mock.ts        # All hardcoded data (transactions, bills, goals, events, forecast…)
├── lib/
│   └── utils.ts       # cn(), formatCurrency(), formatPercent()
├── index.css          # Design tokens (CSS variables) + Tailwind @theme inline
└── App.tsx            # React Router setup with lazy-loaded pages + Suspense
```

---

## Design tokens

All colour, radius, shadow, spacing and font values live as **CSS custom properties** in [`src/index.css`](./src/index.css). Tailwind picks them up via `@theme inline {}` — so tokens are usable as utility classes (`bg-brand`, `text-ink-muted`, `rounded-[var(--radius-card)]`). No hex codes ever appear in components.

```css
/* Light mode example */
:root {
  --brand:   #0F4C3A;   /* forest green  */
  --accent:  #F2A900;   /* marigold      */
  --bg:      #F4EFE6;   /* warm paper    */
  --ink:     #14231C;   /* dark text     */
}
/* Dark mode */
.dark {
  --brand:   #5EE0A0;   /* mint          */
  --accent:  #FFB82E;   /* warm marigold */
  --bg:      #0B1511;   /* deep forest   */
}
```

---

## Design process

This project used the **[ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)** skill (v1) to drive every design decision:

| Decision | Skill query | Outcome |
|----------|-------------|---------|
| **Style pattern** | `"dashboard bento grid asymmetric layout fintech" --domain style` | **Bento Box Grid** — varied card spans (2×1 hero, 1×1 stats, 2×1 charts), hover lift, asymmetric layout |
| **Motion profile** | `--motion 5` dial | Standard stagger list (300-450ms, `back.out(1.4)` easing) on card mount |
| **Chart types** | `"bento grid dashboard finance spending analytics" --domain chart` | Gauge/ring for KPI, Area for forecast (with danger zone), Donut for categories |
| **Stack guidance** | `"shadcn theming tailwind CSS variables dark mode" --stack shadcn` | OKLCH semantic variables, `@theme inline` Tailwind v4 mapping, complete `:root`/`.dark` pairs |
| **Density** | `--density 7` dial | Standard-to-dense: `clamp()` for card padding, `8px` minimum grid gap |
| **Anti-patterns confirmed** | design system output | No purple/indigo, no gradient text, no glassmorphism blobs, no repeated identical icon-circle cards |
| **Typography** | Brief spec from skill + manual override | Bricolage Grotesque (display) + Manrope (body) + JetBrains Mono (numbers), all from `@fontsource` |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | **Dashboard** — hero balance with count-up, 30-day strip, health ring, forecast chart, category donut, insights |
| `/simulate` | **Decision Simulator** — form + Before/After comparison with verdict banner |
| `/commitments` | **Bills & Subscriptions** — grouped by overdue/due/paid with stamp badges |
| `/goals` | **Savings Goals** — progress cards, contribute button, add-goal dialog |
| `/events` | **Surprise Events** — 3-choice cards with consequence hints and animated resolution |
| `/summary` | **Month Summary** — grade badge, key stats, wins/mistakes lists, shareable recap |
| `*` | **404** — receipt-style not-found page with witty copy |

---

## Accessibility

- Semantic HTML: `main`, `nav`, `section`, `h1–h3` in document order
- Skip-to-main link (visible on focus)
- `focus-visible:ring-2` on every interactive element
- `aria-label` on all icon-only buttons and charts
- `aria-hidden="true"` on all decorative icons
- `prefers-reduced-motion` disables all framer-motion animations
- WCAG AA contrast in both light and dark themes
- Touch targets: `min-height: 44px` enforced via `min-h-[44px]` token
