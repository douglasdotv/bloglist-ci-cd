# Use official Node.js image as the base
FROM node:18 AS builder

# Set the working directory for the build stage
WORKDIR /app

# Copy package.json and package-lock.json for both client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for client and server
RUN npm install --prefix client && \
    npm install --prefix server

# Copy the rest of the client and server source code
COPY client/ ./client/
COPY server/ ./server/

# Build the client application
RUN npm run build --prefix client && \
    mkdir -p server/dist && \
    cp -r client/dist/* server/dist/

# Set the working directory for the production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy the server code and dependencies from the builder stage
COPY --from=builder /app/server/package*.json ./
RUN npm install --production

COPY --from=builder /app/server ./

# Expose the port the server listens on
EXPOSE 3003

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["node", "index.js"]
