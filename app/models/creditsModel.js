const connection = require('../config/db/db');

async function getAllCredits() {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM credits');
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createCredit(credit) {
  try {
    const db = await connection.connect();
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
}

async function getCreditById(id) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM credits WHERE id = ?', [id]);
    await db.end();
    return rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getCreditsByUserId(userId) {
  try {
    const db = await connection.connect();
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
}

async function updateCreditById(id, credit) {
  try {
    const db = await connection.connect();
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
}

async function deleteCreditById(id) {
  try {
    const db = await connection.connect();
    const [result] = await db.execute('DELETE FROM credits WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getAllCredits,
  createCredit,
  getCreditById,
  updateCreditById,
  deleteCreditById,
  getCreditsByUserId
};