# STAGE 1: React Kodunu Derleme (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Sadece paket listelerini kopyala ve indir (Önbellek optimizasyonu)
COPY package*.json ./
RUN npm install

# Tüm kodları kopyala ve derle
COPY . .
RUN npm run build

# STAGE 2: NGINX ile Sunma (Production)
FROM nginx:alpine

# Derlenen dosyaları NGINX içine al
COPY --from=build /app/dist /usr/share/nginx/html

# Bizim yazdığımız nginx ayarını varsayılanın üzerine yaz
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]