import { getTransactionsByUserId, Transaction } from './transactionsModel.js'; // Importa o modelo de transações

const transactionController = {
    async getRecentTransactions(req, res) {
        const userId = req.user.id;
        console.log(`[GET RECENT TRANSACTIONS] Iniciando busca de transações recentes para o usuário ID: ${userId}`);

        if (!userId) {
            console.warn(`[GET RECENT TRANSACTIONS] Falha: Usuário não autenticado`);
            return res.status(401).json({ message: 'Usuário não autenticado.' });
        }

        try {
            const recentTransactions = await getTransactionsByUserId(userId); // Buscar as 5 mais recentes
            console.log(`[GET RECENT TRANSACTIONS] Transações recentes encontradas para o usuário ID: ${userId}`);
            res.json(recentTransactions);
        } catch (error) {
            console.error(`[GET RECENT TRANSACTIONS] Erro ao buscar transações recentes para o usuário ID: ${userId}`, error);
            res.status(500).json({ message: 'Erro ao buscar histórico de transações.' });
        }
    },

    async addCredit(req, res) {
        console.log(`[ADD CREDIT] Iniciando adição de crédito`);
        try {
            const { valor, descricao, data_vencimento, category_id } = req.body;
            const user_id = req.user.id; // Obtido do middleware de autenticação

            // Validação dos dados
            if (!valor || !descricao || !data_vencimento) {
                console.warn(`[ADD CREDIT] Falha: Campos obrigatórios ausentes`);
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
            console.log(`[ADD CREDIT] Crédito adicionado com sucesso. ID: ${newTransaction.id}`);
            res.status(201).json({ message: 'Crédito adicionado com sucesso!', transaction: newTransaction });
        } catch (error) {
            console.error(`[ADD CREDIT] Erro ao adicionar crédito`, error);
            res.status(500).json({ message: 'Erro ao adicionar crédito.' });
        }
    },

    async addDebit(req, res) {
        console.log(`[ADD DEBIT] Iniciando adição de débito`);
        try {
            const { valor, descricao, data_vencimento, category_id } = req.body;
            const user_id = req.user.id; // Obtido do middleware de autenticação

            // Validação dos dados
            if (!valor || !descricao || !data_vencimento) {
                console.warn(`[ADD DEBIT] Falha: Campos obrigatórios ausentes`);
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
            console.log(`[ADD DEBIT] Débito adicionado com sucesso. ID: ${newTransaction.id}`);
            res.status(201).json({ message: 'Débito adicionado com sucesso!', transaction: newTransaction });
        } catch (error) {
            console.error(`[ADD DEBIT] Erro ao adicionar débito`, error);
            res.status(500).json({ message: 'Erro ao adicionar débito.' });
        }
    },
};

export const getRecentTransactions = transactionController.getRecentTransactions;
export const addCredit = transactionController.addCredit;
export const addDebit = transactionController.addDebit;