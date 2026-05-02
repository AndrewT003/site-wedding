# Multi-stage build для React
FROM node:18-alpine AS build
WORKDIR /app

# Копіюємо package files
COPY package*.json ./
RUN npm install

# Копіюємо весь код
COPY . .

# Збираємо production build
RUN npm run build

# Production образ з Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Видаляємо дефолтні файли nginx
RUN rm -rf ./*

# Копіюємо зібрані файли
COPY --from=build /app/build .

# Копіюємо nginx конфігурацію
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
