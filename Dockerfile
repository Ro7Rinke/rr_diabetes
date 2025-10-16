# Stage 1: Build
FROM node:20-alpine AS builder

RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

RUN apk update && apk upgrade --no-cache

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 7001

CMD ["node", "dist/main.js"]