FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY serve.json .
RUN npm install -g serve

EXPOSE 80
CMD ["serve", "dist", "-l", "80", "--no-clipboard"]
