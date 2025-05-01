import { getAllUsers, getUserById, createUser, deleteUser } from '../../app/models/usersModel.js';

describe('Testes básicos para usersModel', () => {
  test('Deve retornar todos os usuários', async () => {
    const users = await getAllUsers();
    expect(users).toBeInstanceOf(Array);
  });

  test('Deve retornar um usuário válido ao buscar por ID', async () => {
    const user = await getUserById(1); // Substitua 1 por um ID válido
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('nome');
    expect(user).toHaveProperty('email');
  });

  test('Deve retornar null ao buscar um usuário inexistente', async () => {
    const user = await getUserById(9999); // ID inexistente
    expect(user).toBeNull();
  });

  test('Deve criar um novo usuário com sucesso', async () => {
    const userId = await createUser({
      nome: 'Teste',
      email: 'novo@email.com',
      senha: 'senha123',
    });
    expect(userId).toBeGreaterThan(0);
  });

  test('Deve deletar um usuário existente com sucesso', async () => {
    const result = await deleteUser(1); // Substitua 1 por um ID válido
    expect(result).toBe(true);
  });
});