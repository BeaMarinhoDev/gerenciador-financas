import { loginUser, registerUser } from '../../app/models/authModel.js';

describe('Testes básicos para authModel', () => {
  test('Deve retornar um usuário válido ao fazer login', async () => {
    const user = await loginUser('teste@email.com', 'senha123');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('nome');
    expect(user).toHaveProperty('email');
  });

  test('Deve retornar null ao fazer login com credenciais inválidas', async () => {
    const user = await loginUser('invalido@email.com', 'senhaErrada');
    expect(user).toBeNull();
  });

  test('Deve registrar um novo usuário com sucesso', async () => {
    const userId = await registerUser({
      nome: 'Teste',
      email: 'novo@email.com',
      senha: 'senha123',
    });
    expect(userId).toBeGreaterThan(0);
  });

  test('Deve lançar erro ao tentar registrar um usuário com email já existente', async () => {
    await expect(
      registerUser({
        nome: 'Teste',
        email: 'teste@email.com',
        senha: 'senha123',
      })
    ).rejects.toThrow('Email já cadastrado');
  });

  test('Deve lançar erro ao registrar um usuário com payload inválido', async () => {
    await expect(
      registerUser({
        nome: 'Teste',
      })
    ).rejects.toThrow('Dados inválidos');
  });
});