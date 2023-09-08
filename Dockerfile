FROM node:19.6.1-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY swagger.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:19.6.1-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./
COPY --from=builder /app/swagger.json ./
EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]
