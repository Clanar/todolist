FROM node:20-alpine3.18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Наступний етап для запуску додатку
FROM node:20-alpine3.18

WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
CMD [ "npm", "run", "start" ]
