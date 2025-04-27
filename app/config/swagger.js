import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinitions from './swaggerDefinitions.js';

const options = {
    definition: swaggerDefinitions,
    apis: ['./app/routes/*.js'], // Caminho para os arquivos de rotas (se necessário)
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI disponível em http://localhost:3000/api-docs');
}