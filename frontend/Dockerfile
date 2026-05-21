# ============================== STAGE 1: BUILD ==================================
FROM node:22-alpine AS builder
WORKDIR /app

# Cai pnpm moi nhat
RUN corepack enable && corepack prepare pnpm@latest --activate

# Layer cache: cài dependency trước
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY frontend/package.json ./frontend/

RUN pnpm install --frozen-lockfile

# Copy source code frontend
COPY frontend ./frontend

# Build frontend (standalone output for the runner stage)
ENV NEXT_STANDALONE=true
RUN pnpm nx build frontend

# ============================== STAGE 2: BUILD ==================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# Copy build output from builder stage
COPY --from=builder /app/dist/frontend/.next/standalone ./
COPY --from=builder /app/dist/frontend/.next/static ./dist/frontend/.next/static
COPY --from=builder /app/frontend/public ./frontend/public

EXPOSE 3001
CMD ["node", "frontend/server.js"]