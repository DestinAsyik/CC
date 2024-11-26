# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm ci && npm run build   # If you have a build step

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

# Install production dependencies only
ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app.js ./
COPY --from=builder /app/Routes ./Routes
COPY --from=builder /app/Models ./Models
COPY --from=builder /app/Controllers ./Controllers
COPY --from=builder /app/middleware ./middleware
COPY --from=builder /app/config ./config

# Create uploads directory with proper permissions
RUN mkdir -p uploads && chown -R node:node uploads

# Create a non-root user
USER node

# Set environment variables
ENV PORT 3000
EXPOSE $PORT

# Start the app
CMD ["node", "app.js"] 
