import { getTransactionsByUserId, Transaction } from '../models/transactionsModel.js'; // Importa o modelo de transações

const transactionController = {
    async getRecentTransactions(req, res) {
        const userId = req.user.id;
    
        if (userId) {
            try {
                const recentTransactions = await getTransactionsByUserId(userId); // Buscar as 5 mais recentes
                return res.json(recentTransactions);
            } catch (error) {
                console.error('Erro ao buscar transações recentes:', error);
                return res.status(500).json({ message: 'Erro ao buscar histórico de transações.' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }
    },

    async addCredit(req, res) {
     
        try {
            const { valor, descricao, data_vencimento, category_id } = req.body;
            const user_id = req.user.id; // Obtido do middleware de autenticação

            // Validação dos dados (você pode usar bibliotecas como Joi)
            if (!valor || !descricao || !data_vencimento) {
                return res.status(400).json({ message: 'Valor, descrição e data são obrigatórios.' });
            }

            const newTransaction = new Transaction({
                tipo: 'credit',
                valor,
                descricao,
                data: new Date(data_vencimento), // Ajuste para o formato correto se necessário
                category_id: category_id || null,
                user_id,
            });

            await newTransaction.save();

            return res.status(201).json({ message: 'Crédito adicionado com sucesso!', transaction: newTransaction });
        } catch (error) {
            console.error('Erro ao adicionar crédito:', error);
            return res.status(500).json({ message: 'Erro ao adicionar crédito.' });
        }
    },

    async addDebit(req, res) {
        try {
            const { valor, descricao, data_vencimento, category_id } = req.body; // Removed user_id from destructuring
            const user_id = req.user.id; // Obtido do middleware de autenticação

            // Validação dos dados
            if (!valor || !descricao || !data_vencimento) {
                return res.status(400).json({ message: 'Valor, descrição e data são obrigatórios.' });
            }

            const newTransaction = new Transaction({
                tipo: 'debit',
                valor,
                descricao,
                data: new Date(data_vencimento), // Ajuste para o formato correto se necessário
                category_id: category_id || null,
                user_id,
            });

            await newTransaction.save();


            return res.status(201).json({ message: 'Débito adicionado com sucesso!', transaction: newTransaction });
        } catch (error) {
            console.error('Erro ao adicionar débito:', error);
            return res.status(500).json({ message: 'Erro ao adicionar débito.' });
        }
    },
};

export const getRecentTransactions = transactionController.getRecentTransactions;
export const addCredit = transactionController.addCredit;
export const addDebit = transactionController.addDebit;