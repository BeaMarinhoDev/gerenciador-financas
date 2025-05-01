import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para authController', () => {
  test('Deve retornar 200 ao fazer login com credenciais válidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com', senha: 'senha123' });
    expect(response.status).toBe(200);
  });

  test('Deve retornar 401 ao fazer login com credenciais inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com', senha: 'senhaErrada' });
    expect(response.status).toBe(401);
  });

  test('Deve retornar 422 ao fazer login com payload incompleto', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@email.com' }); // Sem senha
    expect(response.status).toBe(422);
  });

  test('Deve retornar 201 ao registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ nome: 'Teste', email: 'novo@email.com', senha: 'senha123' });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 400 ao tentar registrar um usuário com e-mail já existente', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ nome: 'Teste', email: 'teste@email.com', senha: 'senha123' });
    expect(response.status).toBe(400);
  });
});