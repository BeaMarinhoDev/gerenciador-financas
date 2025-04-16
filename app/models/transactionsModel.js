const connection = require('../config/db/db');

async function getTransactionsByUserId(userId) {
  try {
      const db = await connection.connect();
      const [rows] = await db.execute(`
          SELECT
              id,
              valor,
              'debito' AS tipo, -- Adiciona o tipo para identificar a origem
              DATE_FORMAT(data_vencimento, '%d/%m/%Y') AS data,
              descricao,
              category_id,
              user_id
          FROM
              debits
          WHERE
              user_id = ?
          UNION ALL
          SELECT
              id,
              valor,
              'credito' AS tipo, -- Adiciona o tipo para identificar a origem
              DATE_FORMAT(data_vencimento, '%d/%m/%Y') AS data,
              descricao,
              category_id,
              user_id
          FROM
              credits
          WHERE
              user_id = ?
      `, [userId, userId]);
      await db.end();
      return rows;
  } catch (error) {
      console.error('Erro ao buscar transações:', error);
      throw error;
  }
}



/*getRecentTransactions = async (req, res) => {
  if (req.user.userId) {
    try {
      const userId = req.user.userId;
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
*/
module.exports = {
  getTransactionsByUserId,
  
};