# REWORRKED Design System

Premium DTC headwear — dark-black, collector-grade, editorial.

**Naming:** `Reworrked/[Page]/[Breakpoint]`  
Examples: `Reworrked/Home/Desktop`, `Reworrked/PDP/Mobile`, `Reworrked/Admin/Products/Desktop`

---

## Brand

| Token | Value | Role |
|-------|-------|------|
| Wordmark | REWORRKED | All-caps lockup, hero-level |
| Accent | Bone `#E8E4DC` | Single accent — premium on black |
| Sale | `#B33A3A` | Restrained red, never neon |

## Color tokens

```
--rw-canvas:        #050505
--rw-canvas-elev:   #0A0A0A
--rw-surface:       #111111
--rw-surface-2:     #161616
--rw-surface-3:     #1C1C1C
--rw-border:        #2A2A2A
--rw-text:          #F5F5F5
--rw-text-muted:    #9A9A9A
--rw-accent:        #E8E4DC
--rw-accent-ink:    #0A0A0A
--rw-sale:          #B33A3A
--rw-focus:         #E8E4DC
```

## Typography

| Role | Family | Usage |
|------|--------|-------|
| Display | Bebas Neue | Logo, hero headlines, section titles |
| Body | DM Sans | UI, body, forms, nav |
| Mono | Geist Mono | SKU, specs, admin IDs |

**Scale:** 12 / 14 / 16 / 18 / 24 / 32 / 48 / 72 / 96  
**Tracking:** Display +0.04em–0.12em; body normal; muted labels +0.08em uppercase

## Spacing

4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128

## Motion notes

| Name | Spec | Screen |
|------|------|--------|
| Hero fade | opacity + 12px rise, 800ms ease-out; delays 0.1 / 0.25 / 0.4s | Reworrked/Home/* |
| Product hover | image scale 1.04 · 400ms ease; name/price → bone | ProductCard |
| Sticky header | transparent → `#050505/95` + border · 200ms | SiteHeader |

## Figma / frame naming

`Reworrked/[Page]/[Breakpoint]`

Examples:
- `Reworrked/Home/Mobile`
- `Reworrked/Home/Desktop`
- `Reworrked/PDP/Mobile`
- `Reworrked/Products/Desktop`
- `Reworrked/Checkout/Mobile`
- `Reworrked/Admin/SignIn/Desktop`
- `Reworrked/Admin/Products/Desktop`
- `Reworrked/Admin/ProductForm/Desktop`
- `Reworrked/Admin/Analytics/Desktop`
- `Reworrked/DesignSystem/Desktop`


## Composition rules

1. First viewport = one composition: brand + one headline + one line + CTA group + full-bleed hero. No stats, cards, or badges over hero.
2. Cards only for interaction containers (product tiles, cart lines, admin tables).
3. One job per section.
4. Sticky header: Logo · Shop · Categories · Blog · Search · Cart · Account
5. Slim dismissible promo under header.

## Stack mapping

| App | Port | Role |
|-----|------|------|
| `web/` Next.js 16 | 3001 | Storefront |
| `dashboard/` Vite | 5173 | Admin ops |
| `api/` NestJS 11 | — | REST + JWT + Cloudinary |
