import { getAllDebits, getDebitById, createDebit } from '../../app/models/debitsModel.js';

describe('Testes básicos para debitsModel', () => {
  test('Deve retornar todos os débitos', async () => {
    const debits = await getAllDebits();
    expect(debits).toBeInstanceOf(Array);
  });

  test('Deve retornar um débito válido ao buscar por ID', async () => {
    const debit = await getDebitById(1); // Substitua 1 por um ID válido
    expect(debit).toHaveProperty('id');
    expect(debit).toHaveProperty('valor');
    expect(debit).toHaveProperty('descricao');
  });

  test('Deve retornar null ao buscar um débito inexistente', async () => {
    const debit = await getDebitById(9999); // ID inexistente
    expect(debit).toBeNull();
  });

  test('Deve criar um novo débito com sucesso', async () => {
    const debitId = await createDebit({
      valor: 200.0,
      descricao: 'Conta de luz',
      data_vencimento: '2025-05-10',
      userId: 1,
      categoryId: 3,
    });
    expect(debitId).toBeGreaterThan(0);
  });

  test('Deve lançar erro ao criar um débito com payload inválido', async () => {
    await expect(
      createDebit({
        valor: 200.0,
        descricao: 'Conta de luz',
      })
    ).rejects.toThrow('Dados inválidos');
  });
});