import { connect } from '../config/db.js';

export const getAllDebits = async () => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM debits');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createDebit = async (debit) => {
  try {
    const db = await connect();
    const { valor, data_vencimento, descricao, category_id, user_id } = debit;
    console.log('Dados recebidos:', { valor, data_vencimento, descricao, category_id, user_id });
    const [result] = await db.execute(
      'INSERT INTO debits (valor, data_vencimento, descricao, category_id, user_id) VALUES (?, ?, ?, ?, ?)',
      [valor, data_vencimento, descricao, category_id, user_id]
    );
    await db.end();
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDebitById = async (id) => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM debits WHERE id = ?', [id]);
    await db.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateDebitById = async (id, debit) => {
  try {
    const db = await connect();
    const { valor, data_vencimento, descricao, category_id, user_id } = debit;
    const [result] = await db.execute(
      'UPDATE debits SET valor = ?, data_vencimento = ?, descricao = ?, category_id = ?, user_id = ? WHERE id = ?',
      [valor, data_vencimento, descricao, category_id, user_id, id]
    );
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDebitById = async (id) => {
  try {
    const db = await connect();
    const [result] = await db.execute('DELETE FROM debits WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDebitsByCategory = async (categoryId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT d.*, c.name AS nome_categoria
       FROM debits d
       JOIN categories c ON d.category_id = c.id
       WHERE d.category_id = ?`,
      [categoryId]
    );
    await db.end();
    console.log('Dados retornados do banco de dados:', rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDebits = async (filters, sort, limit, offset) => {
  try {
    const db = await connect();
    let query = `SELECT d.*, c.nome AS nome_categoria FROM debits d JOIN categories c ON d.category_id = c.id`;
    const params = [];

    if (filters) {
      const filterConditions = [];
      for (const key in filters) {
        if (key === 'category_id') {
          filterConditions.push(`d.${key} = ?`);
        } else {
          filterConditions.push(`${key} = ?`);
        }
        params.push(filters[key]);
      }
      query += ` WHERE ${filterConditions.join(' AND ')}`;
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    }
    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    console.log('Consulta SQL:', query);
    console.log('Parâmetros da consulta:', params);

    const [rows] = await db.execute(query, params);
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDebitsByUserId = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT d.*, u.name AS nome_usuario
       FROM debits d
       JOIN users u ON d.user_id = u.id
       WHERE d.user_id = ?`,
      [userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};