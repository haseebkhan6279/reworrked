# REWORRKED API

NestJS 11 + MongoDB + JWT + Cloudinary.

## Setup

1. Copy `.env.example` → `.env`
2. Fill `MONGODB_URI`, Cloudinary keys, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Run:

```bash
npm run start:dev
```

API base: `http://localhost:3000/api`

## Endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/login` | public |
| GET | `/auth/me` | JWT |
| GET/POST | `/products` | JWT |
| GET/PATCH/DELETE | `/products/:id` | JWT |
| GET/POST | `/categories` | JWT |
| PATCH/DELETE | `/categories/:id` | JWT |
| POST | `/uploads` | JWT (multipart `file`) |

On boot, seeds the admin user and default categories if missing.
