# ============================== STAGE 1: BUILD ==================================
FROM node:22-alpine AS builder

WORKDIR /app

# cai dat pnpm moi nhat
RUN corepack enable && corepack prepare pnpm@latest --activate

# Layer cache: cài dependency trước
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml nx.json tsconfig.base.json ./
COPY backend ./backend

RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm --filter @org/backend exec prisma generate

# Build backend
RUN pnpm nx build backend

# ============================== STAGE 2: RUN ==================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy build output from builder stage
COPY --from=builder /app/dist/backend ./

RUN npm install --omit=dev

# Prisma
COPY --from=builder /app/backend/prisma ./prisma
COPY --from=builder /app/backend/prisma.config.ts ./
COPY --from=builder /app/backend/src/generated ./src/generated

COPY backend/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["/docker-entrypoint.sh"]
