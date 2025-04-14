const transactionsModel = require('../models/transactionsModel'); // Vamos criar este model

async function getRecentTransactions(req, res) {
    const userId = req.params.id;

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
};