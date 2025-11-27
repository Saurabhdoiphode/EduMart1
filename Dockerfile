# Multi-stage build for EduMart

# Stage 1: Build React frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client . 
RUN npm run build

# Stage 2: Build backend and serve
FROM node:18-alpine
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install --production

# Install server dependencies
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install

# Copy server code
COPY server . 

# Copy built frontend from builder stage
COPY --from=frontend-builder /app/client/build ../client/build

WORKDIR /app

EXPOSE 10000

ENV PORT=10000
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/index.js"]
