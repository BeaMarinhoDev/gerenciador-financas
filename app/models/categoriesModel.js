const connection = require('../config/db/db');

async function getAllCategories() {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM categories');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createCategory(category, userId) {
  try {
    const db = await connection.connect();
    const { nome, descricao, tipo } = category;
    const [result] = await db.execute(
      'INSERT INTO categories (nome, descricao, tipo) VALUES (?, ?, ?)',
      [nome, descricao, tipo]
    );
    const categoryId = result.insertId;

    await db.execute(
      'INSERT INTO users_categories (user_id, category_id) VALUES (?, ?)',
      [userId, categoryId]
    );

    await db.end();
    return categoryId;async function createCategory(category, userId) {
      try {
        const db = await connection.connect();
        const { nome, descricao, tipo } = category;
        const [result] = await db.execute(
          'INSERT INTO categories (nome, descricao, tipo) VALUES (?, ?, ?)',
          [nome, descricao, tipo]
        );
        const categoryId = result.insertId;
    
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
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCategoryById(id) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM categories WHERE id = ?', [id]);
    await db.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCategoryById(id, category) {
  try {
    const db = await connection.connect();
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
}

async function deleteCategoryById(id) {
  try {
    const db = await connection.connect();

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
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};