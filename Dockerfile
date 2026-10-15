FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM node:24-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY server.js package.json ./
EXPOSE 1337
CMD ["node","server.js"]
