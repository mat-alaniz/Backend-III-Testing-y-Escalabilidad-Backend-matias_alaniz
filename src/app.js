import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

// Evento cuando se conecta a MongoDB
mongoose.connection.on('connected', () => {
  console.log(chalk.cyan('✅ Base de datos MongoDB conectada exitosamente'));
});
mongoose.connection.on('error', (err) => {
  console.log(chalk.red('❌ Error conectando a MongoDB:', err.message));
});

app.listen(PORT,()=>console.log(chalk.green(`Servidor corriendo en http://localhost:${PORT}`)));
