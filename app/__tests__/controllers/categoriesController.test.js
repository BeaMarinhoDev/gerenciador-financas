import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para categoriesController', () => {
  test('Deve retornar 200 ao buscar todas as categorias', async () => {
    const response = await request(app).get('/categories');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 ao buscar uma categoria inexistente', async () => {
    const response = await request(app).get('/categories/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar uma nova categoria', async () => {
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

  test('Deve retornar 422 ao criar uma categoria com payload inválido', async () => {
    const response = await request(app)
      .post('/categories')
      .send({ nome: 'Lazer', tipo: 'débito' }); // Sem userId
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao deletar uma categoria existente', async () => {
    const response = await request(app).delete('/categories/1'); // Substitua 1 por um ID válido
    expect(response.status).toBe(200);
  });
});