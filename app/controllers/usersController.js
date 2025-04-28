// Imports de Models
import * as userModel from '../models/usersModel.js';
import * as debitModel from '../models/debitsModel.js';
import * as creditModel from '../models/creditsModel.js';
import * as transactionModel from '../models/transactionsModel.js';

// Controllers
const usersControllers = {
  async getAllUsers(_req, res) {
    try {
      const users = await userModel.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
    }
  },

  async createUser(req, res) {
    try {
      const userId = await userModel.createUser(req.body);
      res.status(201).json({ id: userId, ...req.body });
    } catch (error) {
      console.error(error);
      if (error.message === 'E-mail já cadastrado') {
        res.status(400).json({ mensagem: 'E-mail já cadastrado' });
      } else {
        res.status(500).json({ mensagem: 'Erro ao criar usuário' });
      }
    }
  },

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await userModel.getUserById(userId);

      if (user !== null) {
        res.json(user);
      } else {
        res.status(404).json({ mensagem: `Não foi encontrado o usuário ${userId}` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: `Erro ao buscar o usuário ${userId}` });
    }
  },

  async updateUserById(req, res) {
    try {
      const affectedRows = await userModel.updateUserById(req.params.id, req.body);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Usuário atualizado com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
    }
  },

  async deleteUserById(req, res) {
    try {
      const affectedRows = await userModel.deleteUserById(req.params.id);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Usuário excluído com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
    }
  },

  async getUserCategories(req, res) {
    try {
      const userId = req.user.id;
      const debitCategories = await transactionModel.getUserCategoriesByType(userId, 'debito');
      const creditCategories = await transactionModel.getUserCategoriesByType(userId, 'credito');

      return res.status(200).json({ debit: debitCategories, credit: creditCategories });
    } catch (error) {
      console.error('Erro ao buscar categorias do usuário:', error);
      return res.status(500).json({ message: 'Erro ao buscar categorias do usuário.' });
    }
  },

  async getUserDebits(req, res) {
    try {
      const userId = req.user.id;
      const debits = await debitModel.getDebitsByUserId(userId);
      res.json(debits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
    }
  },

  async getUserCredits(req, res) {
    try {
      const userId = req.user.id;
      const credits = await creditModel.getCreditsByUserId(userId);
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
    }
  },

  async getUserTransactions(req, res) {
    try {
      const userId = req.user.id;
      const transactions = await transactionModel.getTransactionsByUserId(userId);
      res.json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar transações do usuário' });
    }
  },

  async getUserBalance(req, res) {
    try {
      const userId = req.user.id;
      const balance = await userModel.getUserBalance(userId);
      res.json({ balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar balanço do usuário' });
    }
  },

  async getUserReportsByCategory(req, res) {
    try {
      const userId = req.user.id;
      const categoryId = req.params.categoryId;
      const reports = await userModel.getUserReportsByCategory(userId, categoryId);
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar relatórios por categoria' });
    }
  },

  async getUserReportsByPeriod(req, res) {
    try {
      const userId = req.user.id;
      const startDate = req.query.startDate;
      const endDate = req.query.endDate;
      const reports = await userModel.getUserReportsByPeriod(userId, startDate, endDate);
      res.json(reports);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar relatórios por período' });
    }
  },

  async getUserData(req, res) {
    try {
      const userId = req.user.id;
      const user = await userModel.getUserById(userId);

      if (user) {
        return res.json({ nome: user.nome });
      } else {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
  async getRecentTransactions(req, res) {
    try {
        const userId = req.user.id; // Obtém o ID do usuário autenticado
        const recentTransactions = await transactionModel.getRecentTransactionsByUserId(userId); // Chama o método do model
        res.json(recentTransactions); // Retorna as transações recentes
    } catch (error) {
        console.error('Erro ao buscar transações recentes do usuário:', error);
        res.status(500).json({ mensagem: 'Erro ao buscar transações recentes do usuário' });
    }
},
  

}

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
