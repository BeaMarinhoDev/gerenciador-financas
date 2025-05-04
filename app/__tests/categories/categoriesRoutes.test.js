import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para categoriesRoutes', () => {
  test('Deve retornar 200 em /categories', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 para categoria inexistente em /categories/:id', async () => {
    const response = await request(app).get('/categories/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar uma nova categoria em /categories', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        nome: 'Lazer',
        descricao: 'Role gastronômico com o amor',
        tipo: 'débito',
        userId: 1,
      });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar uma categoria com payload inválido em /categories', async () => {
    const response = await request(app)
      .post('/categories')
      .send({
        nome: 'Lazer',
        tipo: 'débito',
      }); // Sem userId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao buscar categorias por usuário em /categories/user/:userId', async () => {
    const response = await request(app).get('/categories/user/1'); // Substitua 1 por um userId válido
    expect(response.status).toBe(200);
  });
});