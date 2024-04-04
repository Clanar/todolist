# Використання офіційного образу Node.js версії 20 на базі Alpine Linux
FROM node:20-alpine3.18

# Встановлення робочого каталогу /app
WORKDIR /app

# Копіювання файлів package.json та package-lock.json
COPY package*.json ./

# Встановлення залежностей
RUN npm install

# Генерація Prisma клієнта
RUN npx prisma generate

# Копіювання решти додатку
COPY . .

# Збірка Next.js додатку
RUN npm run build

# Команда для запуску додатку
CMD ["npm", "start"]
