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
    console.log(`[GET ALL DEBITS] Iniciando busca de todos os débitos`);
    try {
      const debits = await _getAllDebits();
      console.log(`[GET ALL DEBITS] Busca concluída com sucesso. Total de débitos: ${debits.length}`);
      res.json(debits);
    } catch (error) {
      console.error(`[GET ALL DEBITS] Erro ao buscar débitos`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos' });
    }
  },

  async createDebit(req, res) {
    console.log(`[CREATE DEBIT] Iniciando criação de débito`);
    try {
      const debitId = await _createDebit(req.body);
      console.log(`[CREATE DEBIT] Débito criado com sucesso. ID: ${debitId}`);
      res.status(201).json({ id: debitId, ...req.body });
    } catch (error) {
      console.error(`[CREATE DEBIT] Erro ao criar débito`, error);
      res.status(500).json({ mensagem: 'Erro ao criar débito' });
    }
  },

  async getDebitById(req, res) {
    const debitId = req.params.id;
    console.log(`[GET DEBIT BY ID] Iniciando busca do débito com ID: ${debitId}`);
    try {
      const debit = await _getDebitById(debitId);
      if (debit) {
        console.log(`[GET DEBIT BY ID] Débito encontrado: ${JSON.stringify(debit)}`);
        res.json(debit);
      } else {
        console.warn(`[GET DEBIT BY ID] Débito não encontrado para o ID: ${debitId}`);
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(`[GET DEBIT BY ID] Erro ao buscar débito com ID: ${debitId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar débito' });
    }
  },

  async getDebitsByUserId(req, res) {
    const userId = req.params.id;
    console.log(`[GET DEBITS BY USER ID] Iniciando busca de débitos para o usuário ID: ${userId}`);
    try {
      const debits = await _getDebitsByUserId(userId);
      console.log(`[GET DEBITS BY USER ID] Débitos encontrados para o usuário ID: ${userId}`);
      res.json(debits);
    } catch (error) {
      console.error(`[GET DEBITS BY USER ID] Erro ao buscar débitos do usuário ID: ${userId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
    }
  },

  async updateDebitById(req, res) {
    const debitId = req.params.id;
    console.log(`[UPDATE DEBIT BY ID] Iniciando atualização do débito com ID: ${debitId}`);
    try {
      const affectedRows = await _updateDebitById(debitId, req.body);
      if (affectedRows > 0) {
        console.log(`[UPDATE DEBIT BY ID] Débito atualizado com sucesso. ID: ${debitId}`);
        res.json({ mensagem: 'Débito atualizado com sucesso' });
      } else {
        console.warn(`[UPDATE DEBIT BY ID] Débito não encontrado para o ID: ${debitId}`);
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(`[UPDATE DEBIT BY ID] Erro ao atualizar débito com ID: ${debitId}`, error);
      res.status(500).json({ mensagem: 'Erro ao atualizar débito' });
    }
  },

  async deleteDebitById(req, res) {
    const debitId = req.params.id;
    console.log(`[DELETE DEBIT BY ID] Iniciando exclusão do débito com ID: ${debitId}`);
    try {
      const affectedRows = await _deleteDebitById(debitId);
      if (affectedRows > 0) {
        console.log(`[DELETE DEBIT BY ID] Débito excluído com sucesso. ID: ${debitId}`);
        res.json({ mensagem: 'Débito excluído com sucesso' });
      } else {
        console.warn(`[DELETE DEBIT BY ID] Débito não encontrado para o ID: ${debitId}`);
        res.status(404).json({ mensagem: 'Débito não encontrado' });
      }
    } catch (error) {
      console.error(`[DELETE DEBIT BY ID] Erro ao excluir débito com ID: ${debitId}`, error);
      res.status(500).json({ mensagem: 'Erro ao excluir débito' });
    }
  },

  async getDebitsByCategory(req, res) {
    const categoryId = req.params.categoryId;
    console.log(`[GET DEBITS BY CATEGORY] Iniciando busca de débitos para a categoria ID: ${categoryId}`);
    try {
      const debits = await _getDebitsByCategory(categoryId);
      console.log(`[GET DEBITS BY CATEGORY] Débitos encontrados para a categoria ID: ${categoryId}`);
      res.json(debits);
    } catch (error) {
      console.error(`[GET DEBITS BY CATEGORY] Erro ao buscar débitos por categoria ID: ${categoryId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar débitos por categoria' });
    }
  },

  async getDebits(req, res) {
    console.log(`[GET DEBITS] Iniciando busca de débitos com filtros`);
    try {
      const filters = req.query;
      const sort = req.query.sort;
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const debits = await _getDebits(filters, sort, limit, offset);
      console.log(`[GET DEBITS] Débitos encontrados com os filtros aplicados`);
      res.json(debits);
    } catch (error) {
      console.error(`[GET DEBITS] Erro ao buscar débitos com filtros`, error);
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