import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para transactionsController', () => {
  test('Deve retornar 200 ao buscar transações recentes', async () => {
    const response = await request(app).get('/transactions/recent');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 201 ao adicionar um crédito', async () => {
    const response = await request(app)
      .post('/transactions/credit')
      .send({
        valor: 500.0,
        descricao: 'Salário',
        data_vencimento: '2025-05-01',
        categoryId: 2,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 201 ao adicionar um débito', async () => {
    const response = await request(app)
      .post('/transactions/debit')
      .send({
        valor: 200.0,
        descricao: 'Conta de luz',
        data_vencimento: '2025-05-10',
        categoryId: 3,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao adicionar uma transação com payload inválido', async () => {
    const response = await request(app)
      .post('/transactions/credit')
      .send({ valor: 500.0, descricao: 'Salário' }); // Sem data_vencimento e categoryId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 404 ao buscar uma transação inexistente', async () => {
    const response = await request(app).get('/transactions/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });
});