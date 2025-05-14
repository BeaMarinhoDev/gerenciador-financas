import { getAllUsers, getUserById, createUser, deleteUser, updateUserById } from '../../app/models/usersModel.js';

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

describe('Testes para updateUserById', () => {
  test('Deve atualizar um usuário sem alterar a senha', async () => {
    const affectedRows = await updateUserById(1, {
      nome: 'Novo Nome',
      email: 'novoemail@email.com',
      cpf: '12345678901',
      cep: '12345678',
      numero: '123',
      complemento: 'Apto 101',
    });
    expect(affectedRows).toBeGreaterThan(0);
  });

  test('Deve atualizar um usuário com nova senha', async () => {
    const affectedRows = await updateUserById(1, {
      nome: 'Novo Nome',
      email: 'novoemail@email.com',
      senha: 'novaSenha123',
      cpf: '12345678901',
      cep: '12345678',
      numero: '123',
      complemento: 'Apto 101',
    });
    expect(affectedRows).toBeGreaterThan(0);
  });
});