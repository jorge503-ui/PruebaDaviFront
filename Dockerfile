# Etapa 1: Construcción de la aplicación Angular
FROM node:20-alpine AS build

# Instalar Python y las herramientas de construcción necesarias
RUN apk add --no-cache python3 make g++ bash

# Crear el directorio de la aplicación
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar dependencias de Angular
RUN npm install


# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx

# Copiar los archivos generados en la etapa de construcción a la carpeta de Nginx
COPY --from=build /app/dist/prueba-davi-front/browser /usr/share/nginx/html

# Copiar el archivo de configuración personalizado
COPY default.conf /etc/nginx/conf.d/default.conf