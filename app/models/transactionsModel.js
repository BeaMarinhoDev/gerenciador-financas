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
class Transaction {
    constructor(data) {
        this.tipo = data.tipo;
        this.valor = data.valor;
        this.descricao = data.descricao;
        this.data = data.data;
        this.categoria_id = 19;//data.categoria_id;
        this.user_id = data.user_id;
    }

    async save() {
        try {
            const db = await connection.connect(); // Obtém a conexão aqui
            const [result] = await db.execute(`
              INSERT INTO transactions (tipo, valor, data, descricao, categoria_id, user_id)
              VALUES (?, ?, ?, ?, ?, ?)
          `, [this.tipo, this.valor, this.data, this.descricao, this.categoria_id, this.user_id]); // Use 'this.data' para data_vencimento
            this.id = result.insertId;
            await db.end(); // Libera a conexão após a inserção
            return this;
        } catch (error) {
            console.error('Erro ao salvar transação:', error);
            throw error;
        }
    }
}
    async function getUserCategoriesByType(userId, tipo) {
    try {
        const db = await connection.connect();
        const [rows] = await db.execute('SELECT id, descricao FROM categories WHERE user_id = ? AND tipo = ?', [userId, tipo]);
        await db.end();
        return rows;
    } catch (error) {
        console.error(`Erro ao buscar categorias do usuário (${tipo}):`, error);
        throw error;
    }
    } // Closing brace added here

    module.exports = {
        getTransactionsByUserId,
        Transaction,
        getUserCategoriesByType,
    };