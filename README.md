# REWORRKED

Premium DTC caps — dark-black storefront + admin, Nest API-ready monorepo.

## Apps

| App | Path | Stack | Port |
|-----|------|-------|------|
| Storefront | `web/` | Next.js 16 · React 19 · Tailwind v4 | 3001 |
| Admin | `dashboard/` | Vite · React 19 · RR7 · TanStack Query · ApexCharts | 5173 |
| API | `api/` | NestJS 11 · MongoDB · JWT · Cloudinary | 3000 |

## Design

See [DESIGN.md](./DESIGN.md) for tokens, motion, and Figma naming (`Reworrked/[Page]/[Breakpoint]`).

Accent: **bone `#E8E4DC`** on near-pure black. Display: Bebas Neue. UI: DM Sans.

## Run

```bash
# API (required for admin)
cd api && npm run start:dev

# Storefront
cd web && npm run dev

# Admin
cd dashboard && npm run dev
```

Copy `api/.env.example` → `api/.env` and fill MongoDB / Cloudinary / admin credentials.

Admin sign-in uses real JWT against the API (seeded from `ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Routes (storefront)

`/` · `/products` · `/products/[slug]` · `/category/[slug]` · `/blog` · `/blog/[slug]` · `/local` · `/local/[topic]/[location]` · `/contact` · `/privacy` · `/cookies` · `/cart` · `/checkout` · `/order/confirmation` · `/auth/sign-in` · `/auth/sign-up` · `/account/*` · `/design-system`

## Admin routes

`/sign-in` · `/` · `/products` · `/products/new` · `/products/:id/edit` · `/categories` · `/analytics`
