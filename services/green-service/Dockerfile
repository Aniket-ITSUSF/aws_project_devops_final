# 1. Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --only=production

# 2. Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy production deps
COPY --from=builder /app/node_modules ./node_modules

# Copy app code
COPY . .

# Healthcheck so Kubernetes knows when it's ready
HEALTHCHECK --interval=15s --timeout=3s \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Expose the port and start
EXPOSE 3000
CMD ["node", "index.js"]
