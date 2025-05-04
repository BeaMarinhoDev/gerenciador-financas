import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para usersRoutes', () => {
  test('Deve retornar 200 em /users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 401 em /users sem autenticação', async () => {
    const response = await request(app).get('/users/1'); // Endpoint que requer autenticação
    expect(response.status).toBe(401);
  });

  test('Deve retornar 404 para usuário inexistente em /users/:id', async () => {
    const response = await request(app).get('/users/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar um novo usuário em /users', async () => {
    const response = await request(app)
      .post('/users')
      .send({ nome: 'Teste', email: 'teste@email.com', senha: 'senha123' });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar um usuário com payload inválido em /users', async () => {
    const response = await request(app)
      .post('/users')
      .send({ nome: 'Teste' }); // Sem email e senha
    expect(response.status).toBe(422);
  });
});