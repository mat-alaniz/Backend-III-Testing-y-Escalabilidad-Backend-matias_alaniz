//documetacion con swagger de usuario

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Sistema de mascotas API',
            version: '1.0.0',
            description: 'API para la gestion de usuarios, mascotas y adopciones',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./src/docs/*.yaml'],//ruta de los archivos donde se encuentran las documentaciones
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    console.log('Documentacion de Swagger disponible en http://localhost:8080/api-docs');
};

export default swaggerSpecs;