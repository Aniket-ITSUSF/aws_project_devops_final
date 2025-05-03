# services/<color>-service/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package metadata
COPY package*.json ./

# Install only prod deps (no lockfile needed)
RUN npm install --production

# Copy the rest of your code
COPY . .

# Healthcheck so Kubernetes/your loader knows when it's ready
HEALTHCHECK --interval=15s --timeout=3s \
    CMD wget -qO- http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "index.js"]
