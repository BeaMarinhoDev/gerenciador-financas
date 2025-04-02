const connection = require('../config/db/db');

async function getTransactionsByUserId(userId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT
        'débito' AS tipo,
        d.valor,
        d.data_vencimento AS data
      FROM debits d
      WHERE d.user_id = ?
      UNION ALL
      SELECT
        'crédito' AS tipo,
        c.valor,
        c.data_vencimento AS data
      FROM credits c
      WHERE c.user_id = ?
      ORDER BY data DESC`,
      [userId, userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getTransactionsByUserId,
};