// transactionsModel.js
const db = require('../config/db/db'); // Conexão com o banco de dados

async function getTransactionsByUserId(userId) {
    try {
        const [rows] = await db.execute(`
            SELECT
                id,
                valor,
                tipo,
                DATE_FORMAT(data, '%d/%m/%Y') AS data, -- Formata a data para DD/MM/YYYY
                descricao,
                categoria_id,
                categoria_nome
            FROM
                (SELECT
                    t.id,
                    t.valor,
                    t.tipo,
                    t.data,
                    t.descricao,
                    t.categoria_id,
                    c.nome AS categoria_nome
                FROM
                    transactions t
                LEFT JOIN
                    categories c ON t.categoria_id = c.id
                WHERE
                    t.user_id = ?
                ORDER BY
                    t.data DESC
                LIMIT 5) AS subquery
            ORDER BY
                data DESC;
        `, [userId]);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar transações recentes:', error);
        throw error;
    }
}




const transactionsModel = require('../models/transactionsModel'); // Vamos criar este model

async function getRecentTransactions(req, res) {
    const userId = req.user.id;

    if (userId) {
        try {
            const recentTransactions = await transactionsModel.getTransactionsByUserId(userId); // Buscar as 5 mais recentes
            return res.json(recentTransactions);
        } catch (error) {
            console.error('Erro ao buscar transações recentes:', error);
            return res.status(500).json({ message: 'Erro ao buscar histórico de transações.' });
        }
    } else {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
}

module.exports = {
    getRecentTransactions,
    getTransactionsByUserId
};