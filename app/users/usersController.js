// Imports de Models
import * as userModel from './usersModel.js';
import * as debitModel from '../debits/debitsModel.js';
import * as creditModel from '../credits/creditsModel.js';
import * as transactionModel from '../transactions/transactionsModel.js';

// Controllers
const usersControllers = {
    async getAllUsers(_req, res) {
        console.log(`[GET ALL USERS] Iniciando busca de todos os usuários`);
        try {
            const users = await userModel.getAllUsers();
            console.log(`[GET ALL USERS] Busca concluída com sucesso. Total de usuários: ${users.length}`);
            res.json(users);
        } catch (error) {
            console.error(`[GET ALL USERS] Erro ao buscar usuários`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
        }
    },

    async createUser(req, res) {
        console.log(`[CREATE USER] Iniciando criação de usuário para o email: ${req.body.email}`);
        try {
            const userId = await userModel.createUser(req.body);
            console.log(`[CREATE USER] Usuário criado com sucesso. ID: ${userId}`);
            res.status(201).json({ id: userId, ...req.body });
        } catch (error) {
            console.error(`[CREATE USER] Erro ao criar usuário para o email: ${req.body.email}`, error);
            if (error.message === 'E-mail já cadastrado') {
                console.warn(`[CREATE USER] Falha na criação: E-mail já cadastrado (${req.body.email})`);
                res.status(400).json({ mensagem: 'E-mail já cadastrado' });
            } else {
                res.status(500).json({ mensagem: 'Erro ao criar usuário' });
            }
        }
    },

    async getUserById(req, res) {
        const userId = req.params.id;
        console.log(`[GET USER BY ID] Iniciando busca do usuário com ID: ${userId}`);
        try {
            const user = await userModel.getUserById(userId);

            if (user !== null) {
                console.log(`[GET USER BY ID] Usuário encontrado: ${JSON.stringify(user)}`);
                res.json(user);
            } else {
                console.warn(`[GET USER BY ID] Usuário não encontrado para o ID: ${userId}`);
                res.status(404).json({ mensagem: `Não foi encontrado o usuário ${userId}` });
            }
        } catch (error) {
            console.error(`[GET USER BY ID] Erro ao buscar usuário com ID: ${userId}`, error);
            res.status(500).json({ mensagem: `Erro ao buscar o usuário ${userId}` });
        }
    },

    async updateUserById(req, res) {
        const userId = req.params.id;
        console.log(`[UPDATE USER BY ID] Iniciando atualização do usuário com ID: ${userId}`);
        try {
            const affectedRows = await userModel.updateUserById(userId, req.body);
            if (affectedRows > 0) {
                console.log(`[UPDATE USER BY ID] Usuário atualizado com sucesso. ID: ${userId}`);
                res.json({ mensagem: 'Usuário atualizado com sucesso' });
            } else {
                console.warn(`[UPDATE USER BY ID] Usuário não encontrado para o ID: ${userId}`);
                res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(`[UPDATE USER BY ID] Erro ao atualizar usuário com ID: ${userId}`, error);
            res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
        }
    },

    async deleteUserById(req, res) {
        const userId = req.params.id;
        console.log(`[DELETE USER BY ID] Iniciando exclusão do usuário com ID: ${userId}`);
        try {
            const affectedRows = await userModel.deleteUserById(userId);
            if (affectedRows > 0) {
                console.log(`[DELETE USER BY ID] Usuário excluído com sucesso. ID: ${userId}`);
                res.json({ mensagem: 'Usuário excluído com sucesso' });
            } else {
                console.warn(`[DELETE USER BY ID] Usuário não encontrado para o ID: ${userId}`);
                res.status(404).json({ mensagem: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.error(`[DELETE USER BY ID] Erro ao excluir usuário com ID: ${userId}`, error);
            res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
        }
    },

    async getUserCategories(req, res) {
        console.log(`[GET USER CATEGORIES] Iniciando busca de categorias para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const debitCategories = await transactionModel.getUserCategoriesByType(userId, 'debito');
            const creditCategories = await transactionModel.getUserCategoriesByType(userId, 'credito');

            console.log(`[GET USER CATEGORIES] Categorias encontradas para o usuário ID: ${userId}`);
            res.status(200).json({ debit: debitCategories, credit: creditCategories });
        } catch (error) {
            console.error(`[GET USER CATEGORIES] Erro ao buscar categorias do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar categorias do usuário' });
        }
    },

    async getUserDebits(req, res) {
        console.log(`[GET USER DEBITS] Iniciando busca de débitos para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const debits = await debitModel.getDebitsByUserId(userId);
            console.log(`[GET USER DEBITS] Débitos encontrados para o usuário ID: ${userId}`);
            res.json(debits);
        } catch (error) {
            console.error(`[GET USER DEBITS] Erro ao buscar débitos do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
        }
    },

    async getUserCredits(req, res) {
        console.log(`[GET USER CREDITS] Iniciando busca de créditos para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const credits = await creditModel.getCreditsByUserId(userId);
            console.log(`[GET USER CREDITS] Créditos encontrados para o usuário ID: ${userId}`);
            res.json(credits);
        } catch (error) {
            console.error(`[GET USER CREDITS] Erro ao buscar créditos do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
        }
    },

    async getUserTransactions(req, res) {
        console.log(`[GET USER TRANSACTIONS] Iniciando busca de transações para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const transactions = await transactionModel.getTransactionsByUserId(userId);
            console.log(`[GET USER TRANSACTIONS] Transações encontradas para o usuário ID: ${userId}`);
            res.json(transactions);
        } catch (error) {
            console.error(`[GET USER TRANSACTIONS] Erro ao buscar transações do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar transações do usuário' });
        }
    },

    async getUserBalance(req, res) {
        console.log(`[GET USER BALANCE] Iniciando busca de balanço para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const balance = await userModel.getUserBalance(userId);
            console.log(`[GET USER BALANCE] Balanço encontrado para o usuário ID: ${userId}`);
            res.json({ balance });
        } catch (error) {
            console.error(`[GET USER BALANCE] Erro ao buscar balanço do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar balanço do usuário' });
        }
    },

    async getUserReportsByCategory(req, res) {
        console.log(`[GET USER REPORTS BY CATEGORY] Iniciando busca de relatórios por categoria para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const categoryId = req.params.categoryId;
            const reports = await userModel.getUserReportsByCategory(userId, categoryId);
            console.log(`[GET USER REPORTS BY CATEGORY] Relatórios encontrados para o usuário ID: ${userId}, Categoria: ${categoryId}`);
            res.json(reports);
        } catch (error) {
            console.error(`[GET USER REPORTS BY CATEGORY] Erro ao buscar relatórios por categoria para o usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar relatórios por categoria' });
        }
    },

    async getUserReportsByPeriod(req, res) {
        console.log(`[GET USER REPORTS BY PERIOD] Iniciando busca de relatórios por período para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const reports = await userModel.getUserReportsByPeriod(userId, startDate, endDate);
            console.log(`[GET USER REPORTS BY PERIOD] Relatórios encontrados para o usuário ID: ${userId}, Período: ${startDate} a ${endDate}`);
            res.json(reports);
        } catch (error) {
            console.error(`[GET USER REPORTS BY PERIOD] Erro ao buscar relatórios por período para o usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar relatórios por período' });
        }
    },

    async getUserData(req, res) {
        console.log(`[GET USER DATA] Iniciando busca de dados do usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const user = await userModel.getUserById(userId);

            if (user) {
                console.log(`[GET USER DATA] Dados encontrados para o usuário ID: ${userId}`);
                res.json({ nome: user.nome });
            } else {
                console.warn(`[GET USER DATA] Usuário não encontrado para o ID: ${userId}`);
                res.status(404).json({ mensagem: 'Usuário não encontrado.' });
            }
        } catch (error) {
            console.error(`[GET USER DATA] Erro ao buscar dados do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    async getRecentTransactions(req, res) {
        console.log(`[GET RECENT TRANSACTIONS] Iniciando busca de transações recentes para o usuário ID: ${req.user.id}`);
        try {
            const userId = req.user.id;
            const recentTransactions = await transactionModel.getRecentTransactionsByUserId(userId);
            console.log(`[GET RECENT TRANSACTIONS] Transações recentes encontradas para o usuário ID: ${userId}`);
            res.json(recentTransactions);
        } catch (error) {
            console.error(`[GET RECENT TRANSACTIONS] Erro ao buscar transações recentes do usuário ID: ${req.user.id}`, error);
            res.status(500).json({ mensagem: 'Erro ao buscar transações recentes do usuário' });
        }
    },
};

// Exportação dos métodos do controlador
export const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getUserCategories,
    getUserDebits,
    getUserCredits,
    getUserTransactions,
    getUserBalance,
    getUserReportsByCategory,
    getUserReportsByPeriod,
    getUserData,
    getRecentTransactions,
} = usersControllers;
