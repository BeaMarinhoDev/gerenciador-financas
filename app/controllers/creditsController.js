import {
  getAllCredits as _getAllCredits,
  createCredit as _createCredit,
  getCreditById as _getCreditById,
  getCreditsByUserId as _getCreditsByUserId,
  updateCreditById as _updateCreditById,
  deleteCreditById as _deleteCreditById,
  getCreditsByCategory as _getCreditsByCategory,
  getCredits as _getCredits
} from '../models/creditsModel.js';

const creditsController = {
  async getAllCredits(req, res) {
    try {
      const credits = await _getAllCredits();
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos' });
    }
  },

  async createCredit(req, res) {
    try {
      const creditId = await _createCredit(req.body);
      res.status(201).json({ id: creditId, ...req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao criar crédito' });
    }
  },

  async getCreditById(req, res) {
    try {
      const creditId = req.params.id;
      const credit = await _getCreditById(creditId);
      if (credit) {
        res.json(credit);
      } else {
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar crédito' });
    }
  },

  async getCreditsByUserId(req, res) {
    try {
      const userId = req.params.id; // Obtém o ID do usuário da rota
      const credits = await _getCreditsByUserId(userId);
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
    }
  },

  async updateCreditById(req, res) {
    try {
      const affectedRows = await _updateCreditById(req.params.id, req.body);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Crédito atualizado com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao atualizar crédito' });
    }
  },

  async deleteCreditById(req, res) {
    try {
      const affectedRows = await _deleteCreditById(req.params.id);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Crédito excluído com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir crédito' });
    }
  },

  async getCreditsByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const credits = await _getCreditsByCategory(categoryId);
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos por categoria' });
    }
  },

  async getCredits(req, res) {
    try {
      const filters = req.query;
      const sort = req.query.sort;
      const credits = await _getCredits(filters, sort);
      res.json(credits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos' });
    }
  }
};

export const getAllCredits = creditsController.getAllCredits;
export const createCredit = creditsController.createCredit;
export const getCreditById = creditsController.getCreditById;
export const getCreditsByUserId = creditsController.getCreditsByUserId;
export const updateCreditById = creditsController.updateCreditById;
export const deleteCreditById = creditsController.deleteCreditById;
export const getCreditsByCategory = creditsController.getCreditsByCategory;
export const getCredits = creditsController.getCredits;