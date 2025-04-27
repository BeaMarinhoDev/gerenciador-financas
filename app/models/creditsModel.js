import { connect } from '../config/db.js';

export const getAllCredits = async () => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM credits');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCredit = async (credit) => {
  try {
    const db = await connect();
    const { valor, data_vencimento, descricao, category_id, user_id } = credit;
    const [result] = await db.execute(
      'INSERT INTO credits (valor, data_vencimento, descricao, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [valor, data_vencimento, descricao, category_id, user_id]
    );
    await db.end();
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreditById = async (id) => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM credits WHERE id = ?', [id]);
    await db.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreditsByUserId = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT c.*, u.nome AS nome_usuario
       FROM credits c
       JOIN users u ON c.user_id = u.id
       WHERE c.user_id = ?`,
      [userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCreditById = async (id, credit) => {
  try {
    const db = await connect();
    const { valor, data_vencimento, descricao, category_id, user_id } = credit;
    const [result] = await db.execute(
      'UPDATE credits SET valor = ?, data_vencimento = ?, descricao = ?, category_id = ?, user_id = ? WHERE id = ?',
      [valor, data_vencimento, descricao, category_id, user_id, id]
    );
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCreditById = async (id) => {
  try {
    const db = await connect();
    const [result] = await db.execute('DELETE FROM credits WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCreditsByCategory = async (categoryId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT c.*, ca.nome AS nome_categoria
       FROM credits c
       JOIN categories ca ON c.category_id = ca.id
       WHERE c.category_id = ?`,
      [categoryId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCredits = async (filters, sort) => {
  try {
    const db = await connect();
    let query = `SELECT c.*, ca.nome AS nome_categoria FROM credits c JOIN categories ca ON c.category_id = ca.id`;
    const params = [];

    if (filters) {
      const filterConditions = [];
      for (const key in filters) {
        filterConditions.push(`${key} = ?`);
        params.push(filters[key]);
      }
      query += ` WHERE ${filterConditions.join(' AND ')}`;
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    }

    const [rows] = await db.execute(query, params);
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};