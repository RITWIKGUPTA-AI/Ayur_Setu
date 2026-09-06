# Multi-stage Dockerfile for AyurSetu Fullstack Application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy the entire repo in one shot. Using a single COPY (instead of copying
# package.json files from individual subfolders first) avoids build failures
# if the build context / working directory ever shifts, since it doesn't
# assume any specific subfolder exists before the rest of the source arrives.
COPY . .

# Install dependencies for both the client (root) and the server
RUN npm ci
RUN npm --prefix server ci

# Build both client and server
RUN npm run build

# Production runtime image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Copy built server artifacts and dependencies
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 5001

CMD ["node", "server/dist/server.js"]
