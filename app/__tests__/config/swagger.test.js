import request from 'supertest';
import app from '../../../app.js'; // Certifique-se de que o caminho para o arquivo principal do servidor está correto
import fs from 'fs';
import path from 'path';

describe('Swagger Configuration', () => {
  const swaggerFilePath = path.resolve(__dirname, '../app/config/swagger.json');
  let swaggerDocument;

  beforeAll(() => {
    // Carrega o arquivo swagger.json antes dos testes
    swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, 'utf8'));
  });

  test('Deve configurar o Swagger corretamente no servidor', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<title>Swagger UI</title>'); // Verifica se o HTML do Swagger UI é retornado
  });

  test('Deve garantir que o middleware do Swagger UI está configurado', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toContain('text/html'); // Verifica se o conteúdo retornado é HTML
  });

  test('Deve validar a estrutura do arquivo swagger.json', () => {
    expect(swaggerDocument).toHaveProperty('openapi', '3.0.0');
    expect(swaggerDocument).toHaveProperty('info');
    expect(swaggerDocument.info).toHaveProperty('title', 'Gerenciador de Finanças - API');
    expect(swaggerDocument.info).toHaveProperty('version', '1.0.0');
    expect(swaggerDocument).toHaveProperty('paths');
    expect(swaggerDocument).toHaveProperty('components');
    expect(swaggerDocument.components).toHaveProperty('schemas');
    expect(swaggerDocument).toHaveProperty('tags');
  });

  test('Deve garantir que as tags estão definidas corretamente no swagger.json', () => {
    const tags = swaggerDocument.tags || [];
    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'auth' }),
        expect.objectContaining({ name: 'users' }),
        expect.objectContaining({ name: 'transactions' }),
        expect.objectContaining({ name: 'categories' }),
        expect.objectContaining({ name: 'credits' }),
        expect.objectContaining({ name: 'debits' }),
        expect.objectContaining({ name: 'reports' }),
        expect.objectContaining({ name: 'balance' })
      ])
    );
  });

  test('Deve garantir que o endpoint /api-docs está acessível', async () => {
    const response = await request(app).get('/api-docs');
    expect(response.status).toBe(200);
    expect(response.text).toContain('<title>Swagger UI</title>');
  });

  test('Deve garantir que os endpoints estão definidos no paths do swagger.json', () => {
    const paths = swaggerDocument.paths || {};
    expect(paths).toHaveProperty('/auth/login');
    expect(paths).toHaveProperty('/categories');
    expect(paths).toHaveProperty('/transactions');
    expect(paths).toHaveProperty('/users');
    expect(paths).toHaveProperty('/credits');  
    expect(paths).toHaveProperty('/debits');
    expect(paths).toHaveProperty('/reports');   
    expect(paths).toHaveProperty('/balance');     
    // Adicione outros endpoints esperados aqui
  });

  test('Deve garantir que os schemas estão definidos corretamente no swagger.json', () => {
    const schemas = swaggerDocument.components.schemas || {};
    expect(schemas).toHaveProperty('User');
    expect(schemas).toHaveProperty('Transaction');
    expect(schemas).toHaveProperty('Category');
    expect(schemas).toHaveProperty('Debit');
    expect(schemas).toHaveProperty('Credit');       
    expect(schemas).toHaveProperty('Report');
    expect(schemas).toHaveProperty('Balance');
    // Adicione outros schemas esperados aqui
  });
});