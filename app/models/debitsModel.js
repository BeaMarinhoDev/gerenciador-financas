const connection = require('../config/db/db');

async function getAllDebits() {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM debits');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createDebit(debit) {
  try {
    const db = await connection.connect();
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
}

async function getDebitById(id) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM debits WHERE id = ?', [id]);
    await db.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getDebitsByUserId(userId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT d.*, u.nome AS nome_usuario
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
}

async function updateDebitById(id, debit) {
  try {
    const db = await connection.connect();
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
}

async function deleteDebitById(id) {
  try {
    const db = await connection.connect();
    const [result] = await db.execute('DELETE FROM debits WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
async function getDebitsByCategory(categoryId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT d.*, c.nome AS nome_categoria
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
}

async function getDebits(filters, sort, limit, offset) {
  try {
    const db = await connection.connect();
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
}

async function getDebitsByUserId(userId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT d.*, u.nome AS nome_usuario
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
}

module.exports = {
  getAllDebits,
  createDebit,
  getDebitById,
  updateDebitById,
  deleteDebitById,
  getDebitsByUserId,
  getDebitsByCategory,
  getDebits,
  getDebitsByUserId
};