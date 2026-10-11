# Broke But Functional

> **Survive 30 days on ₹10,000** — an honest, aesthetic Gen Z personal finance survival simulator for students and early-career grads.
> Timeline: Oct 3 to Nov 1, 2026. Current state: Day 8 (Oct 10). Starting budget ₹10,000 + ₹2,000 pocket money top-up − ₹5,760 spent = **₹6,240 liquid balance**.

**Live URL:** (<https://broke-but-functional-five.vercel.app/>)

**Tech Stack:** React 19 + TypeScript + Vite 8 · Tailwind CSS v4 · shadcn/ui (Radix primitives) · Recharts · Framer Motion · React Router 7

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev       # http://localhost:5173

# Lint check (0 errors)
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview   # http://localhost:4173
```

---

## Simulated Connectors & Mock Data Notice

> [!NOTE]
> **Nothing is really connected. All data is mock data and connectors are simulated.**
> This app never asks for passwords, OTPs, PINs, bank credentials, or write access. All transaction flows, UPI logs, and account aggregator feeds are locally computed in-memory simulations illustrating privacy-first fintech design.

---

## Pages & Routes

| Route | Page | Description |
| --- | --- | --- |
| `/` | **Dashboard** | 12-column bento grid, liquid balance counter, solid actual spend line (Oct 3–10) + dashed red projection (to Nov 1) with shaded deficit zone below ₹0 and Oct 28 marker, next 3 committed bills with dates, runway extension tip, and category donut chart. |
| `/calendar` | **Spending Calendar** | Mon–Sun grid (Oct 3 Saturday anchor with 5 leading empty cells), non-colour status cues (`Burn`, `Above`, `Calm`, `Plan`), typography $\ge$ 12px, pure discretionary spend stats (fixed bills excluded), and day-detail panel with due bills and expense action. |
| `/simulate` | **Decision Simulator** | What-if spending test (pre-filled with Swiggy ₹1,200), alert title *"Danger zone pulled forward"*, health score delta (`68 → 58`), unified 4-tier risk scale (`Safe` / `Warning` / `Danger` / `Critical`), select with chevron, solid primary confirm button. |
| `/commitments` | **Bills & Dues** | Life obligations tracker with `"Mark paid"` row action, auto-pay dues displaying `"Auto-pay on Oct 20"` with no manual button, `"Unpaid"` stat card, and proper singular/plural grammar (`1 bill` vs `N bills`). |
| `/goals` | **Savings Goals** | Challenge targets featuring Lucide `Headphones` icon, 3-tier survival unlocking protocol, Goa Weekend challenge target (Oct 30), and *"Course fee buffer unlocked"* milestone. |
| `/connect` | **Auto-Sync Connectors** | 3-column pipeline cards grid, clear privacy guarantee notice, SMS card displaying `"Needs reconnect"` with active Reconnect button and disabled Sync Now, plus review inbox. |
| `/events` | **Surprise Incidents** | Dilemma decision cards with consequences, resolved history log, and verified semester certification fee copy (*"The university announced a ₹600 semester certification fee, due Oct 18"*). |
| `/summary` | **Midpoint Audit** | Challenge grade, Insolvency Horizon card with stacked labels (zero collisions), Rent rendered in neutral styling (settled fixed bill), category burn breakdown, and shareable card. |
| `/settings` | **Settings & Controls** | Baseline budget editor, start date picker, alert sensitivity controls, light/dark mode switch, portable JSON backup export/import, and challenge reset modal. |
| `*` | **404 Not Found** | Receipt-styled error route with link back to dashboard. |

---

## Project Structure

```
src/
├── types/
│   └── finance.ts         # TypeScript domain interfaces (Transaction, Bill, Goal, FinanceEvent, Connector, etc.)
├── constants/
│   └── index.ts           # Navigation routes, risk levels, thresholds, challenge dates
├── data/                  # Single source of truth (typed mock arrays & pure selectors)
│   ├── transactions.ts    # 12 raw transactions summing to exactly ₹5,760 spent
│   ├── bills.ts           # 6 committed bills (Rent on Oct 4, auto-pay flags, unpaid dues)
│   ├── goals.ts           # 4 challenge goals (Headphones, Emergency Cushion, Goa Weekend, Course fee)
│   ├── events.ts          # Surprise incident dilemmas and resolved log
│   ├── connectors.ts      # 3 simulated aggregator pipelines + available sources
│   ├── scenarios.ts       # Decision simulator presets (Swiggy ₹1,200 what-if)
│   ├── selectors.ts       # Pure calculation helpers (sumBy, groupByDay, getDiscretionaryStats, etc.)
│   └── index.ts           # Unified data exports
├── lib/
│   ├── format.ts          # Formatters: formatCurrency (-₹320), formatDate, formatDelta, formatPercent
│   ├── motion.ts          # Framer Motion animation presets (fadeUp, scaleUp)
│   └── utils.ts           # Class merger cn() and shared utilities
├── components/
│   ├── ui/                # Atomic shadcn primitives (Card, Button, Badge, Input, Switch, Dialog, Progress, Skeleton, ErrorBoundary)
│   ├── layout/            # AppShell, Header ("Next day" button), SidebarRail, BottomNav
│   ├── dialogs/           # Modular standalone dialogs (AddExpense, AddIncome, AddBill, AddGoal, Contribute, Resolve, ConfirmReset)
│   ├── dashboard/         # Hero card, Forecast chart, Committed bills, Health score, Category spend, Insights
│   ├── calendar/          # Mon–Sun grid, discretionary burn cards, day-detail panel with due bills
│   ├── simulator/         # What-if spending form, danger zone comparison card, impact breakdown
│   ├── bills/             # Due status badges, bill rows with "Mark paid", auto-pay indicators, summary cards
│   ├── goals/             # Goal cards with headphones icon, challenge progress, survival strategy rules
│   ├── events/            # Incident choices, animated outcomes, resolved incident history
│   ├── summary/           # Grade card, plan vs actual comparison (stacked labels), category breakdown (neutral Rent), wins/slips
│   ├── connect/           # Notice banner, 3-column pipeline cards, sync logs, permission modal
│   └── settings/          # Challenge parameters, sensitivity controls, theme switcher, backup/export
├── pages/                 # Thin routes (<150 lines each, composing components only)
│   ├── Dashboard.tsx
│   ├── Calendar.tsx
│   ├── Simulator.tsx
│   ├── Commitments.tsx
│   ├── Goals.tsx
│   ├── Connect.tsx
│   ├── Events.tsx
│   ├── Summary.tsx
│   ├── Settings.tsx
│   └── NotFound.tsx
├── index.css              # Design tokens (CSS variables) + Tailwind v4 @theme inline
└── App.tsx                # Lazy routes with React.lazy, Suspense, and route-level ErrorBoundary
```

---

## Deployment & Routing (Vercel)

For Single Page Applications (SPAs) built with React Router, a `vercel.json` configuration ensures that direct navigation and page refreshes on deep links (such as `/calendar` or `/summary`) route correctly to `index.html`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Storage Architecture (IndexedDB + Zod)

To guarantee that the application never crashes in private browsing mode, quota-exceeded conditions, or blocked environments, the storage layer is architected as follows:

- **Zero `localStorage` / `sessionStorage`:** Every trace of synchronous Web Storage has been eradicated across the codebase.
- **Asynchronous IndexedDB Layer ([`src/lib/storage.ts`](file:///d:/project/Survive/src/lib/storage.ts)):** Built on top of `idb-keyval` targeting a single database (`broke-but-functional-db`) with distinct keys (`settings`, `theme`, `finance-state`, `schema-version`).
- **Resilient In-Memory Fallbacks:** All IndexedDB reads and writes are wrapped in `try/catch`. If IndexedDB is unavailable or blocked (e.g., incognito mode or storage quota exceeded), the app transparently falls back to an in-memory `Map` store. First paint never blocks on storage.
- **Strict Zod Runtime Validation ([`src/types/schemas.ts`](file:///d:/project/Survive/src/types/schemas.ts)):** Every payload retrieved from storage is validated against Zod schemas. Corrupt, malformed, or outdated payloads are safely discarded and replaced with default seed data.
- **Schema Versioning:** The database stores `CURRENT_SCHEMA_VERSION = 1`. Future versions trigger automatic migrations or safe resets.
- **Debounced Writes (300ms):** Rapid state modifications are debounced by 300ms to eliminate storage thrashing.
- **Secure Export & Import:** Backups are serialized through the storage layer with a strict 1 MB file size limit and Zod validation. Files with unknown keys or scripts are rejected. Zero use of `eval` or `dangerouslySetInnerHTML`.
- **Zero-Flash Theme Bootstrapping:** An inline script in `<head>` applies the `dark` class from `prefers-color-scheme` before first paint, followed by post-mount hydration of user overrides from IndexedDB.

---

## Performance Architecture & Lighthouse Audit

### Performance Optimizations
1. **Self-Hosted Variable Fonts:** Replaced heavy static font families with Latin-subset variable `@font-face` definitions (`Bricolage Grotesque`, `Manrope`, `JetBrains Mono`) with metric-matched fallback overrides (`ascent-override`, `size-adjust`) to eliminate layout shift on font swap (CLS = 0).
2. **Critical Font Preload:** JetBrains Mono is preloaded via `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the hero balance number.
3. **Lazy Recharts with IntersectionObserver:** Heavy chart rendering is deferred until cards scroll within 200px of the viewport, with exact-height skeleton placeholders (220px for forecast, 160px for category donut).
4. **Vite ES2022 & Modular Splitting:** Optimized bundle splitting with `manualChunks` isolating `react-vendor`, `charts`, and `radix`, while excluding deferred chart chunks from initial `<link rel="modulepreload">`.
5. **Route Chunk Prefetching:** Prefetches route chunks on browser idle (`requestIdleCallback` scheduled 3s post-load) and on link hover/focus.
6. **Mobile CSS & Paint Guardrails:** Disabled expensive `backdrop-filter` on mobile (`max-width: 640px`), applied `content-visibility: auto` to below-the-fold cards, and removed all blocking animation delays from the LCP hero balance number.
7. **Cache & Security Headers:** `vercel.json` provides immutable 1-year caching for `/assets/*` and `/fonts/*` plus standard security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, strict CSP).

### Before / After Verification

| Metric / Category | Baseline | Optimized | Delta |
| --- | --- | --- | --- |
| **Mobile Accessibility** | 92 | **100** | +8 (Zero failing audits) |
| **Mobile SEO** | 91 | **100** | +9 (Zero failing audits) |
| **Mobile Best Practices** | 100 | **100** | Maintained |
| **Mobile Performance** | 80 | **86** | +6 |
| **Total Blocking Time (TBT)** | ~180 ms | **10 ms** | -170 ms |
| **Cumulative Layout Shift (CLS)** | 0.08 | **0.000** | 0.000 |
| **Largest Contentful Paint (LCP)** | 4.2 s (throttled) | **3.6 s** (throttled) | -600 ms |
| **Desktop Performance** | 82 | **86** | +4 |
| **Desktop Accessibility / SEO** | 92 / 91 | **100 / 100** | Perfect scores |
| **Dashboard Route Chunk** | 398.5 kB (gzip: 113.7 kB) | **20.6 kB** (gzip: 5.1 kB) | **-95%** |
| **Entry Chunk (`index.js`)** | 275.5 kB (gzip: 86.8 kB) | **117.2 kB** (gzip: 34.4 kB) | **-57%** |
| **Button Chunk** | 40.8 kB (gzip: 13.9 kB) | **1.6 kB** (gzip: 0.7 kB) | **-96%** |
| **Recharts / Charts Chunk** | In synchronous bundle | **Deferred to viewport** | Deferred (0 kB at first paint) |

---

## Design Tokens & Theme

All design tokens are defined as **CSS custom properties** in [`src/index.css`](file:///d:/project/Survive/src/index.css) and exposed through Tailwind CSS v4 via `@theme inline {}`. Components strictly use token classes (`bg-brand`, `text-ink-muted`, `bg-safe-bg`, `border-border`, `text-warning`, `text-danger`). All text and warning tokens meet or exceed WCAG AA $\ge 4.5:1$ contrast against both light cream (`#F4EFE6`) and dark forest (`#0B1511`) backgrounds.
