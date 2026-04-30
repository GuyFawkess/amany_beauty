FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY serve.json .
RUN npm install -g serve

EXPOSE 3000
CMD ["serve", "dist", "-s", "-l", "3000", "--no-clipboard"]
