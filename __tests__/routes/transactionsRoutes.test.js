import request from 'supertest';
import app from '../../app.js';

describe('Testes básicos para transactionsRoutes', () => {
  test('Deve retornar 200 em /transactions', async () => {
    const response = await request(app).get('/transactions');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 200 ao buscar transações recentes em /transactions/recent', async () => {
    const response = await request(app).get('/transactions/recent');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 para transação inexistente em /transactions/:id', async () => {
    const response = await request(app).get('/transactions/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar uma nova transação em /transactions', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        valor: 100.5,
        descricao: 'Compra no mercado',
        tipo: 'débito',
        userId: 1,
        categoryId: 2,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar uma transação com payload inválido em /transactions', async () => {
    const response = await request(app)
      .post('/transactions')
      .send({
        valor: 100.5,
        descricao: 'Compra no mercado',
        tipo: 'débito',
      }); // Sem userId e categoryId
    expect(response.status).toBe(422);
  });
});