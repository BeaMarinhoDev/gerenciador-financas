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

getRecentTransactionss = async (req, res) => {
  if (req.session.userId) {
    try {
      const userId = req.session.userId;
      const recentTransactions = await getTransactionsByUserId(userId);
      return res.json(recentTransactions);
    } catch (error) {
      console.error('Erro ao buscar transações recentes:', error);
      return res.status(500).json({ message: 'Erro ao buscar histórico de transações.' });
    }
  } else {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }
};  

module.exports = {
  getTransactionsByUserId,
};