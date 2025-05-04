import {
  getAllDebits as _getAllDebits,
  createDebit as _createDebit,
  getDebitById as _getDebitById,
  getDebitsByUserId as _getDebitsByUserId,
  updateDebitById as _updateDebitById,
  deleteDebitById as _deleteDebitById,
  getDebitsByCategory as _getDebitsByCategory,
  getDebits as _getDebits
} from './debitsModel.js';

const debitsController = {
  async getAllDebits(req, res) {
    try {
      const debits = await _getAllDebits();
      res.json(debits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos' });
    }
  },

  async createDebit(req, res) {
    try {
      const debitId = await _createDebit(req.body);
      res.status(201).json({ id: debitId, ...req.body });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao criar débito' });
    }
  },

  async getDebitById(req, res) {
    try {
      const debitId = req.params.id;
      const debit = await _getDebitById(debitId);
      if (debit) {
        res.json(debit);
      } else {
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débito' });
    }
  },

  async getDebitsByUserId(req, res) {
    try {
      const userId = req.params.id;
      const debits = await _getDebitsByUserId(userId);
      res.json(debits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
    }
  },

  async updateDebitById(req, res) {
    try {
      const affectedRows = await _updateDebitById(req.params.id, req.body);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Débito atualizado com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao atualizar débito' });
    }
  },

  async deleteDebitById(req, res) {
    try {
      const affectedRows = await _deleteDebitById(req.params.id);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Débito excluído com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir débito' });
    }
  },

  async getDebitsByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const debits = await _getDebitsByCategory(categoryId);
      res.json(debits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos por categoria' });
    }
  },

  async getDebits(req, res) {
    try {
      const filters = req.query;
      const sort = req.query.sort;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const debits = await _getDebits(filters, sort, limit, offset);
      res.json(debits);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos' });
    }
  }
};

export const getAllDebits = debitsController.getAllDebits;
export const createDebit = debitsController.createDebit;
export const getDebitById = debitsController.getDebitById;
export const getDebitsByUserId = debitsController.getDebitsByUserId;
export const updateDebitById = debitsController.updateDebitById;
export const deleteDebitById = debitsController.deleteDebitById;
export const getDebitsByCategory = debitsController.getDebitsByCategory;
export const getDebits = debitsController.getDebits;