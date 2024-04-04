# Використання офіційного образу Node.js версії 20 на базі Alpine Linux
FROM node:20-alpine3.18 as builder
# Встановлення робочого каталогу /app
WORKDIR /app
# Копіювання файлів package.json та package-lock.json
COPY package*.json ./
# Встановлення залежностей
RUN npm install --production
# Копіювання Prisma schema
COPY prisma ./prisma
# Генерація Prisma клієнта
RUN npx prisma generate
# Копіювання решти додатку
COPY . .
# Збірка Next.js додатку 
RUN npm run build
EXPOSE 3000
# Команда для запуску додатку
CMD ["npm", "start"]
