# Usar imagen base ligera de Node.js
FROM node:18-bullseye-slim

# Crear directorio de la app
WORKDIR /app

# Instalar dependencias del sistema necesarias para compilar módulos nativos (bcrypt)
RUN apt-get update && apt-get install -y python3 make g++ build-essential && rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias y forzar construcción desde fuente si hace falta
RUN npm install --unsafe-perm --build-from-source

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 8080

# Variable de entorno para el puerto
ENV PORT=8080

# Comando para iniciar la aplicación
CMD ["npm", "start"]