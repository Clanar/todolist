# Use the official Node.js image version 20 based on Alpine Linux
FROM node:20-alpine3.18 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application
COPY . .

# Install Tailwind CSS
RUN npm install tailwindcss

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
