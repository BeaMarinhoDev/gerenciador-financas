import { getAllCategories, getCategoryById, createCategory } from '../../app/models/categoriesModel.js';

describe('Testes básicos para categoriesModel', () => {
  test('Deve retornar todas as categorias', async () => {
    const categories = await getAllCategories();
    expect(categories).toBeInstanceOf(Array);
  });

  test('Deve retornar uma categoria válida ao buscar por ID', async () => {
    const category = await getCategoryById(1); // Substitua 1 por um ID válido
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('nome');
    expect(category).toHaveProperty('descricao');
  });

  test('Deve retornar null ao buscar uma categoria inexistente', async () => {
    const category = await getCategoryById(9999); // ID inexistente
    expect(category).toBeNull();
  });

  test('Deve criar uma nova categoria com sucesso', async () => {
    const categoryId = await createCategory({
      nome: 'Lazer',
      descricao: 'Role gastronômico com o amor',
      tipo: 'débito',
      userId: 1,
    });
    expect(categoryId).toBeGreaterThan(0);
  });

  test('Deve lançar erro ao criar uma categoria com payload inválido', async () => {
    await expect(
      createCategory({
        nome: 'Lazer',
        tipo: 'débito',
      })
    ).rejects.toThrow('Dados inválidos');
  });
});