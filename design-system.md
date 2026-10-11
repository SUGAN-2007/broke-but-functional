# Design System — Broke But Functional

> "Rupee note meets night market" — warm, earthy, confident, Gen Z fintech
> Built for the 30-day ₹10,000 survival challenge.

Generated with **UI/UX Pro Max** skill (variance 8, motion 5, density 7), then merged with brand constraints.

---

## 1. Style Direction

| Attribute | Decision | Rationale |
|-----------|----------|-----------|
| **Pattern** | Bento Box Grid (12 columns) + Editorial hierarchy | Asymmetric, dominant hero element, strict right-edge alignment |
| **Style** | Warm Brutalism (structured, borders-first, earthy palette) | Anti-AI-prototype: no generic purple/indigo, no glassmorphism blobs |
| **Mode** | Light + Dark, tokens-driven | Both fully defined and tested for WCAG AA contrast |
| **Density** | 7/10 — standard-to-dense for dashboard | Data-rich cashflow indicators with breathable card padding |
| **Max Width** | 1200px centered content shell | Prevents ledger rows from stretching edge-to-edge on ultrawides |

---

## 2. Colour Tokens

- **background**: `#F4EFE6` (light) / `#0B1511` (dark)
- **surface**: `#FBF8F2` (light) / `#121F19` (dark)
- **surface-raised**: `#FFFFFF` (light) / `#182A22` (dark)
- **ink**: `#14231C` (light) / `#EDE7DA` (dark)
- **ink-muted**: `#5E6B63` (light) / `#8FA095` (dark)
- **border**: `#E2DACB` (light) / `#223A2F` (dark)
- **border-strong**: `#C8BDA8` (light) / `#2E5040` (dark)
- **brand**: `#0F4C3A` (light) / `#5EE0A0` (dark)
- **accent**: `#F2A900` (light) / `#FFB82E` (dark)
- **safe**: `#1F9D6B` (`rgba(31, 157, 107, 0.12)` bg)
- **warning**: `#E8A317` (`rgba(232, 163, 23, 0.12)` bg)
- **danger**: `#D8432F` (`rgba(216, 67, 47, 0.12)` bg)

---

## 3. Typography Scale

- **Display**: Bricolage Grotesque 600-800, `-0.02em` tracking
- **Body**: Manrope 400-600
- **Numbers / Currency**: JetBrains Mono, tabular numbers
- **Hero number**: `clamp(2.75rem, 8vw + 1rem, 5.5rem)`
- **Page Titles (H1)**: `clamp(1.75rem, 3vw + 1rem, 2.75rem)`
- **Body Text**: `clamp(0.875rem, 0.25vw + 0.8125rem, 1rem)`

---

## 4. Layout & Navigation Hierarchy

- **Shell**: `min-h-dvh` with `max-w-[1200px]` page wrapper and `pb-[env(safe-area-inset-bottom)]`.
- **Desktop**: 72px icon rail with all 9 pages directly accessible (Dashboard, Calendar, Simulator, Bills, Goals, Connect, Events, Summary, Settings).
  - Hover tooltips with accessible `aria-label` and `role="tooltip"`.
  - Active indicator is brand green only. Simulator is a standard nav item.
- **Mobile**: 5-item bottom bar (Home, Calendar, Simulate center FAB with accent amber, Goals, More) + slide-up sheet.
- **Header**: Sticky glass header with "Day 8 of 30" chip, simulation "+1d" step button, danger badge, notifications bell with active event dropdown, and light/dark toggle.

---

## 5. UI/UX Pro Max Pre-Delivery Review

- [x] **No emoji as structural icons**: Vector-only icons from Lucide across all components.
- [x] **Graduated due-status**: Red (1-2 days), amber (3-7 days), neutral (8+ days), green (paid).
- [x] **Heatmap definition**: Clear definition lines and customizable multiplier/threshold controls.
- [x] **Touch targets**: All interactive buttons and nav items satisfy $\ge 44\text{px}$.
- [x] **Keyboard accessibility**: Visible focus rings (`focus-visible:ring-2 focus-visible:ring-brand`), skip link to main content, `aria-live="polite"` on simulation output.
- [x] **Anti-patterns avoided**: Zero unapproved colors, no credential inputs on simulated connectors, no layout shifts on hover.
