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

async function updateDebitById(id, debit) {
  try {
    const db = await connection.connect();
    const { valor, data, descricao, category_id, user_id } = debit;
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

module.exports = {
  getAllDebits,
  createDebit,
  getDebitById,
  updateDebitById,
  deleteDebitById
};