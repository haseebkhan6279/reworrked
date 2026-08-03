# Build from monorepo root (Railway default) — Nest API only
FROM node:22-alpine AS builder
WORKDIR /app

COPY api/package.json api/package-lock.json* ./
RUN npm ci

COPY api/ ./
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY api/package.json api/package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main.js"]
