import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import errorHandler from './middlewares/errorHandler.js';
import compression from 'compression';
import logger from './utils/logger.js';



dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL);

logger.info('Iniciando servidor Express...');

app.use(compression());
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);
app.use(errorHandler);

// Evento cuando se conecta a MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        logger.info('✅ Conectado a MongoDB Atlas');
    })
    .catch((error) => {
        logger.error('❌ Error conectando a MongoDB:', error.message);
    });

// Eventos de conexión de MongoDB
mongoose.connection.on('connected', () => {
    logger.info('✅ Base de datos MongoDB conectada exitosamente');
});

mongoose.connection.on('error', (err) => {
    logger.error('❌ Error en conexión MongoDB:', err.message);
});


app.listen(PORT, () => logger.info(`🚀 Servidor corriendo en http://localhost:${PORT}`));
