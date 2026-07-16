# Stage 1: Build
FROM node:22-alpine AS builder
ARG GTM_ID
ARG META_PIXEL_ID
ENV GTM_ID=$GTM_ID
ENV META_PIXEL_ID=$META_PIXEL_ID
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4321
ENV HOST=0.0.0.0 PORT=4321
CMD ["node", "./dist/server/entry.mjs"]