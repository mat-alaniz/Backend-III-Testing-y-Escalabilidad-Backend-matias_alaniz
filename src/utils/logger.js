//sistema de logging usando Winston define cómo, dónde y qué tipo de información se registra en la aplicación.

import winston from 'winston';

const customColors = {
    info: 'cyan',      // 🔵 Celeste para mensajes informativos
    error: 'red',      // 🔴 Rojo para errores  
    warn: 'yellow',    // 🟡 Amarillo para advertencias
    debug: 'green',    // 🟢 Verde para mensajes de debug
};

// Agregar colores
winston.addColors(customColors);

// Crear el logger principal
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true }), winston.format.simple())
        }),
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error'
        }),
        //Logs en ARCHIVO general
        new winston.transports.File({ filename: 'logs/combined.log'})
    ]
});

export default logger;