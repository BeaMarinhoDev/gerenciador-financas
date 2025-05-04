import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Recria __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerFilePath = path.resolve(__dirname, 'swagger.json');
const swaggerDefinitions = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));

const options = {
    definition: swaggerDefinitions,
    apis: ['./app/routes/*.js'], // Caminho para os arquivos de rotas (se necessário)
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger UI disponível em http://localhost:3000/api-docs');
}