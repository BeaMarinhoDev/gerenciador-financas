import {
  getAllCredits as _getAllCredits,
  createCredit as _createCredit,
  getCreditById as _getCreditById,
  getCreditsByUserId as _getCreditsByUserId,
  updateCreditById as _updateCreditById,
  deleteCreditById as _deleteCreditById,
  getCreditsByCategory as _getCreditsByCategory,
  getCredits as _getCredits
} from './creditsModel.js';

const creditsController = {
  async getAllCredits(req, res) {
    console.log(`[GET ALL CREDITS] Iniciando busca de todos os créditos`);
    try {
      const credits = await _getAllCredits();
      console.log(`[GET ALL CREDITS] Busca concluída com sucesso. Total de créditos: ${credits.length}`);
      res.json(credits);
    } catch (error) {
      console.error(`[GET ALL CREDITS] Erro ao buscar créditos`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos' });
    }
  },

  async createCredit(req, res) {
    console.log(`[CREATE CREDIT] Iniciando criação de crédito`);
    try {
      const creditId = await _createCredit(req.body);
      console.log(`[CREATE CREDIT] Crédito criado com sucesso. ID: ${creditId}`);
      res.status(201).json({ id: creditId, ...req.body });
    } catch (error) {
      console.error(`[CREATE CREDIT] Erro ao criar crédito`, error);
      res.status(500).json({ mensagem: 'Erro ao criar crédito' });
    }
  },

  async getCreditById(req, res) {
    const creditId = req.params.id;
    console.log(`[GET CREDIT BY ID] Iniciando busca do crédito com ID: ${creditId}`);
    try {
      const credit = await _getCreditById(creditId);
      if (credit) {
        console.log(`[GET CREDIT BY ID] Crédito encontrado: ${JSON.stringify(credit)}`);
        res.json(credit);
      } else {
        console.warn(`[GET CREDIT BY ID] Crédito não encontrado para o ID: ${creditId}`);
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(`[GET CREDIT BY ID] Erro ao buscar crédito com ID: ${creditId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar crédito' });
    }
  },

  async getCreditsByUserId(req, res) {
    const userId = req.params.id;
    console.log(`[GET CREDITS BY USER ID] Iniciando busca de créditos para o usuário ID: ${userId}`);
    try {
      const credits = await _getCreditsByUserId(userId);
      console.log(`[GET CREDITS BY USER ID] Créditos encontrados para o usuário ID: ${userId}`);
      res.json(credits);
    } catch (error) {
      console.error(`[GET CREDITS BY USER ID] Erro ao buscar créditos do usuário ID: ${userId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
    }
  },

  async updateCreditById(req, res) {
    const creditId = req.params.id;
    console.log(`[UPDATE CREDIT BY ID] Iniciando atualização do crédito com ID: ${creditId}`);
    try {
      const affectedRows = await _updateCreditById(creditId, req.body);
      if (affectedRows > 0) {
        console.log(`[UPDATE CREDIT BY ID] Crédito atualizado com sucesso. ID: ${creditId}`);
        res.json({ mensagem: 'Crédito atualizado com sucesso' });
      } else {
        console.warn(`[UPDATE CREDIT BY ID] Crédito não encontrado para o ID: ${creditId}`);
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(`[UPDATE CREDIT BY ID] Erro ao atualizar crédito com ID: ${creditId}`, error);
      res.status(500).json({ mensagem: 'Erro ao atualizar crédito' });
    }
  },

  async deleteCreditById(req, res) {
    const creditId = req.params.id;
    console.log(`[DELETE CREDIT BY ID] Iniciando exclusão do crédito com ID: ${creditId}`);
    try {
      const affectedRows = await _deleteCreditById(creditId);
      if (affectedRows > 0) {
        console.log(`[DELETE CREDIT BY ID] Crédito excluído com sucesso. ID: ${creditId}`);
        res.json({ mensagem: 'Crédito excluído com sucesso' });
      } else {
        console.warn(`[DELETE CREDIT BY ID] Crédito não encontrado para o ID: ${creditId}`);
        res.status(404).json({ mensagem: 'Crédito não encontrado' });
      }
    } catch (error) {
      console.error(`[DELETE CREDIT BY ID] Erro ao excluir crédito com ID: ${creditId}`, error);
      res.status(500).json({ mensagem: 'Erro ao excluir crédito' });
    }
  },

  async getCreditsByCategory(req, res) {
    const categoryId = req.params.categoryId;
    console.log(`[GET CREDITS BY CATEGORY] Iniciando busca de créditos para a categoria ID: ${categoryId}`);
    try {
      const credits = await _getCreditsByCategory(categoryId);
      console.log(`[GET CREDITS BY CATEGORY] Créditos encontrados para a categoria ID: ${categoryId}`);
      res.json(credits);
    } catch (error) {
      console.error(`[GET CREDITS BY CATEGORY] Erro ao buscar créditos por categoria ID: ${categoryId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar créditos por categoria' });
    }
  },

  async getCredits(req, res) {
    console.log(`[GET CREDITS] Iniciando busca de créditos com filtros`);
    try {
      const filters = req.query;
      const sort = req.query.sort;
      const credits = await _getCredits(filters, sort);
      console.log(`[GET CREDITS] Créditos encontrados com os filtros aplicados`);
      res.json(credits);
    } catch (error) {
      console.error(`[GET CREDITS] Erro ao buscar créditos com filtros`, error);
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