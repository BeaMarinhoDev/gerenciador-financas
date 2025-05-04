import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para creditsRoutes', () => {
  test('Deve retornar 200 em /credits', async () => {
    const response = await request(app).get('/credits');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 para crédito inexistente em /credits/:id', async () => {
    const response = await request(app).get('/credits/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar um novo crédito em /credits', async () => {
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

  test('Deve retornar 422 ao criar um crédito com payload inválido em /credits', async () => {
    const response = await request(app)
      .post('/credits')
      .send({
        valor: 500.0,
        descricao: 'Salário',
      }); // Sem userId e categoryId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao buscar créditos por usuário em /credits/user/:userId', async () => {
    const response = await request(app).get('/credits/user/1'); // Substitua 1 por um userId válido
    expect(response.status).toBe(200);
  });
});