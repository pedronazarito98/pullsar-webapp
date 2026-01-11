# Build stage
FROM node:20-alpine AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build Strapi
ENV NODE_ENV=production
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 strapi && \
    adduser --system --uid 1001 strapi

# Copy built files from builder
COPY --from=builder --chown=strapi:strapi /app/dist ./dist
COPY --from=builder --chown=strapi:strapi /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:strapi /app/package.json ./
COPY --from=builder --chown=strapi:strapi /app/public ./public
COPY --from=builder --chown=strapi:strapi /app/config ./config
COPY --from=builder --chown=strapi:strapi /app/src ./src
COPY --from=builder --chown=strapi:strapi /app/database ./database

# Set user
USER strapi

# Expose port
EXPOSE 1337

# Environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:1337/_health || exit 1

# Start command
CMD ["node", "node_modules/@strapi/strapi/bin/strapi.js", "start"]
