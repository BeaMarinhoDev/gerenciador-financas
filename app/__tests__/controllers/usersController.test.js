import request from 'supertest';
import app from '../../../app.js';

describe('Testes básicos para usersController', () => {
  test('Deve retornar 200 ao buscar todos os usuários', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
  });

  test('Deve retornar 404 ao buscar um usuário inexistente', async () => {
    const response = await request(app).get('/users/9999'); // ID inexistente
    expect(response.status).toBe(404);
  });

  test('Deve retornar 201 ao criar um novo usuário', async () => {
    const response = await request(app)
      .post('/users')
      .send({ nome: 'Teste', email: 'novo@email.com', senha: 'senha123' });
    expect(response.status).toBe(201);
  });

  test('Deve retornar 422 ao criar um usuário com payload inválido', async () => {
    const response = await request(app)
      .post('/users')
      .send({ nome: 'Teste' }); // Sem email e senha
    expect(response.status).toBe(422);
  });

  test('Deve retornar 200 ao deletar um usuário existente', async () => {
    const response = await request(app).delete('/users/1'); // Substitua 1 por um ID válido
    expect(response.status).toBe(200);
  });

  test('Deve atualizar o usuário com um CEP válido de até 15 caracteres', async () => {
    const response = await request(app)
      .put('/users/1')
      .send({
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        cep: '12345-678',
        numero: '123',
        complemento: 'Apto 101'
      });
    expect(response.status).toBe(200);
    expect(response.body.mensagem).toBe('Usuário atualizado com sucesso.');
  });
});