import { connect } from '../config/db.js';

export const getAllCategories = async () => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM categories');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCategory = async (category, userId) => {
  try {
    const db = await connect();
    const { nome, descricao, tipo } = category;

    // Validação adicional para evitar valores undefined
    if (!nome || !tipo || !userId) {
      throw new Error('Parâmetros inválidos para criar categoria');
    }

    // Insere a categoria na tabela categories
    const [result] = await db.execute(
      'INSERT INTO categories (nome, descricao, tipo, user_id) VALUES (?, ?, ?, ?)',
      [nome, descricao || null, tipo, userId]
    );
    const categoryId = result.insertId;

    // Relaciona a categoria ao usuário na tabela users_categories
    await db.execute(
      'INSERT INTO users_categories (user_id, category_id) VALUES (?, ?)',
      [userId, categoryId]
    );

    await db.end();
    return categoryId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategoriesByUserId = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT c.*
       FROM categories c
       JOIN users_categories uc ON c.id = uc.category_id
       WHERE uc.user_id = ?`,
      [userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCategoryById = async (id, category) => {
  try {
    const db = await connect();
    const { nome, descricao, tipo } = category;
    const [result] = await db.execute(
      'UPDATE categories SET nome = ?, descricao = ?, tipo = ? WHERE id = ?',
      [nome, descricao, tipo, id]
    );
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const db = await connect();

    // Excluir as relações na tabela users_categories
    await db.execute('DELETE FROM users_categories WHERE category_id = ?', [id]);

    // Excluir a categoria na tabela categories
    const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);

    await db.end();
    return result.affectedRows;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      'SELECT * FROM categories WHERE id = ?',
      [categoryId]
    );
    await db.end();
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    throw error;
  }
};