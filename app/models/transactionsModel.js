import { connect } from '../config/db.js'; // Ajuste o caminho conforme necessário


export const getTransactionsByUserId = async (userId) => {
    try {
        const db = await connect();
        const [rows] = await db.execute(`
          SELECT
            id,
            valor,
            'debito' AS tipo,
            data_vencimento AS data, -- formato natural YYYY-MM-DD
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
            'credito' AS tipo,
            data_vencimento AS data,
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
 export class Transaction {
    constructor(data) {
        this.tipo = data.tipo;
        this.valor = data.valor;
        this.descricao = data.descricao;
        this.data = data.data;
        this.categoria_id = 19; // data.categoria_id;
        this.user_id = data.user_id;
    }

    async save() {
        try {
            const db = await connect();
            const [result] = await db.execute(`
              INSERT INTO transactions (tipo, valor, data, descricao, categoria_id, user_id)
              VALUES (?, ?, ?, ?, ?, ?)
            `, [this.tipo, this.valor, this.data, this.descricao, this.categoria_id, this.user_id]);
            this.id = result.insertId;
            await db.end();
            return this;
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
            throw error;
        }
    }
}

export const getUserCategoriesByType = async (userId, tipo) => {
    try {
        const db = await connect();
        const [rows] = await db.execute(
            'SELECT id, descricao FROM categories WHERE user_id = ? AND tipo = ?',
            [userId, tipo]
        );
        await db.end();
        return rows;
    } catch (error) {
        console.error(`Erro ao buscar categorias do usuário (${tipo}):`, error);
        throw error;
}
}
export const getRecentTransactionsByUserId = async (userId) => {
  try {
      const db = await connect();
      const query = `
          SELECT *
          FROM transactions
          WHERE user_id = ?
          ORDER BY data DESC
          LIMIT 10
      `;
      const [rows] = await db.execute(query, [userId]); // Substitua `db` pelo seu objeto de conexão ao banco
      await db.end(); // Feche a conexão após a consulta
      return rows;
  } catch (error) {
      console.error('Erro ao buscar transações recentes:', error);
      throw error;
  }
};


