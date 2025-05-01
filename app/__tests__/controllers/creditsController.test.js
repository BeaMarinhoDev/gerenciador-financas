import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para creditsController', () => {
  test('Deve retornar 200 ao buscar todos os créditos', async () => {
    const response = await request(app).get('/credits');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 ao buscar um crédito inexistente', async () => {
    const response = await request(app).get('/credits/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar um novo crédito', async () => {
    const response = await request(app)
      .post('/credits')
      .send({
        valor: 500.0,
        descricao: 'Salário',
        data_vencimento: '2025-05-01',
        userId: 1,
        categoryId: 2,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar um crédito com payload inválido', async () => {
    const response = await request(app)
      .post('/credits')
      .send({ valor: 500.0, descricao: 'Salário' }); // Sem userId e categoryId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao buscar créditos por categoria', async () => {
    const response = await request(app).get('/credits/categories/1'); // Substitua 1 por um categoryId válido
    expect(response.status).toBe(200);
  });
});