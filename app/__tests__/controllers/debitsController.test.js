import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para debitsController', () => {
  test('Deve retornar 200 ao buscar todos os débitos', async () => {
    const response = await request(app).get('/debits');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 ao buscar um débito inexistente', async () => {
    const response = await request(app).get('/debits/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar um novo débito', async () => {
    const response = await request(app)
      .post('/debits')
      .send({
        valor: 200.0,
        descricao: 'Conta de luz',
        data_vencimento: '2025-05-10',
        userId: 1,
        categoryId: 3,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar um débito com payload inválido', async () => {
    const response = await request(app)
      .post('/debits')
      .send({ valor: 200.0, descricao: 'Conta de luz' }); // Sem userId e categoryId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao buscar débitos por categoria', async () => {
    const response = await request(app).get('/debits/categories/1'); // Substitua 1 por um categoryId válido
    expect(response.status).toBe(200);
  });
});