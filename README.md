
# 🐾 Sistema de Mascotas - Backend

## 📋 Descripción
Sistema backend para gestión de usuarios, mascotas y adopciones desarrollado con Node.js, Express y MongoDB.

## 🚀 Características
- ✅ CRUD completo de usuarios, mascotas y adopciones
- ✅ Autenticación JWT
- ✅ Documentación Swagger
- ✅ Tests funcionales
- ✅ Dockerizado

## 🐳 Docker

### 📦 Imagen Docker
La aplicación está disponible como imagen Docker en:
**[IMAGEN DOCKER](https://hub.docker.com/repository/docker/matecaialaniz/pets-app/general)**

### 🎯 Ejecutar con Docker

# Descargar y ejecutar la imagen
docker run -p 8080:8080 --env-file .env matecaialaniz/pets-app

## Construir localmente

# Clonar el repositorio
git clone https://github.com/mat-alaniz/Backend-III-Testing-y-Escalabilidad-Backend-matias_alaniz

# Construir imagen
docker build -t pets-app .

# Ejecutar
docker run -p 8080:8080 --env-file .env pets-app

### 📚 Documentación API

Una vez ejecutada la aplicación, accede a la documentación Swagger en:
🔗  http://localhost:8080/api-docs

### 🧪 Tests

# Ejecutar tests de adopciones

npm run test:adoptions

# Ejecutar todos los tests

npm test

### 👨‍💻 Autor ###
Matías Alaniz

🔗 GitHub: [mat-alaniz](https://github.com/mat-alaniz)

💼 LinkedIn: [Matias Jesus Alaniz](https://www.linkedin.com/in/matias-jesus-alaniz-552099343/)

📧 Email: [matias.cai.alaniz@gmail.com]

🐳 Docker Hub: [matecaialaniz/pets-app](https://hub.docker.com/repository/docker/matecaialaniz/pets-app)

### 📦 Dependencias principales


🟢 Express.js

🟢 MongoDB + Mongoose

🟢 JWT para autenticación

🟢 Bcrypt para contraseñas

🟢 Swagger para documentación

🟢 Mocha/Chai para testing



