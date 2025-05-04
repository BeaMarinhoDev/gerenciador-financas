import { getAllCredits, getCreditById, createCredit } from '../../credits/creditsModel.js';

describe('Testes básicos para creditsModel', () => {
  test('Deve retornar todos os créditos', async () => {
    const credits = await getAllCredits();
    expect(credits).toBeInstanceOf(Array);
  });

  test('Deve retornar um crédito válido ao buscar por ID', async () => {
    const credit = await getCreditById(1); // Substitua 1 por um ID válido
    expect(credit).toHaveProperty('id');
    expect(credit).toHaveProperty('valor');
    expect(credit).toHaveProperty('descricao');
  });

  test('Deve retornar null ao buscar um crédito inexistente', async () => {
    const credit = await getCreditById(9999); // ID inexistente
    expect(credit).toBeNull();
  });

  test('Deve criar um novo crédito com sucesso', async () => {
    const creditId = await createCredit({
      valor: 500.0,
      descricao: 'Salário',
      data_vencimento: '2025-05-01',
      userId: 1,
      categoryId: 2,
    });
    expect(creditId).toBeGreaterThan(0);
  });

  test('Deve lançar erro ao criar um crédito com payload inválido', async () => {
    await expect(
      createCredit({
        valor: 500.0,
        descricao: 'Salário',
      })
    ).rejects.toThrow('Dados inválidos');
  });
});