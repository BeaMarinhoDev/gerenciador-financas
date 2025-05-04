import request from 'supertest';
import app from '../../../app.js'; // Certifique-se de que o caminho para o arquivo principal do servidor está correto

describe('Testes básicos para authRoutes', () => {
  test('Deve retornar 200 em /auth/login com payload válido', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com', password: 'senha123' });
    expect(response.status).toBe(200);
  });

  test('Deve retornar 401 em /auth/login com payload inválido', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com', password: 'senhaErrada' });
    expect(response.status).toBe(401);
  });

  test('Deve retornar 422 em /auth/login com payload incompleto', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com' }); // Sem o campo password
    expect(response.status).toBe(422);
  });

  test('Deve retornar 404 para rota inexistente em /auth', async () => {
    const response = await request(app).get('/auth/rota-inexistente');
    expect(response.status).toBe(404);
  });

  test('Deve retornar 405 para método não permitido em /auth/login', async () => {
    const response = await request(app).get('/auth/login'); // GET não é permitido
    expect(response.status).toBe(405);
  });
});