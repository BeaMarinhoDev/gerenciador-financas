import { getRecentTransactionsByUserId, createTransaction } from '../../transactions/transactionsModel.js';

describe('Testes básicos para transactionsModel', () => {
  test('Deve retornar transações recentes de um usuário', async () => {
    const transactions = await getRecentTransactionsByUserId(1); // Substitua 1 por um userId válido
    expect(transactions).toBeInstanceOf(Array);
  });

  test('Deve criar uma nova transação com sucesso', async () => {
    const transactionId = await createTransaction({
      valor: 100.0,
      descricao: 'Compra no mercado',
      tipo: 'débito',
      userId: 1,
      categoryId: 2,
    });
    expect(transactionId).toBeGreaterThan(0);
  });

  test('Deve lançar erro ao criar uma transação com payload inválido', async () => {
    await expect(
      createTransaction({
        valor: 100.0,
        descricao: 'Compra no mercado',
      })
    ).rejects.toThrow('Dados inválidos');
  });

  test('Deve retornar uma transação válida ao buscar por ID', async () => {
    const transaction = await getTransactionById(1); // Substitua 1 por um ID válido
    expect(transaction).toHaveProperty('id');
    expect(transaction).toHaveProperty('valor');
    expect(transaction).toHaveProperty('descricao');
  });

  test('Deve retornar null ao buscar uma transação inexistente', async () => {
    const transaction = await getTransactionById(9999); // ID inexistente
    expect(transaction).toBeNull();
  });
});