import {
  getAllCategories as _getAllCategories,
  createCategory as _createCategory,
  getCategoryById as _getCategoryById,
  updateCategoryById as _updateCategoryById,
  deleteCategoryById as _deleteCategoryById
} from './categoriesModel.js';

const categoriesController = {
  async getAllCategories(req, res) {
    console.log(`[GET ALL CATEGORIES] Iniciando busca de todas as categorias`);
    try {
      const categories = await _getAllCategories();
      console.log(`[GET ALL CATEGORIES] Busca concluída com sucesso. Total de categorias: ${categories.length}`);
      res.json(categories);
    } catch (error) {
      console.error(`[GET ALL CATEGORIES] Erro ao buscar categorias`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar categorias' });
    }
  },

  async createCategory(req, res) {
    const { userId, nome, descricao, tipo } = req.body;
    console.log(`[CREATE CATEGORY] Iniciando criação de categoria para o usuário ID: ${userId}`);

    // Validação dos campos obrigatórios
    if (!userId) {
      console.warn(`[CREATE CATEGORY] Falha na criação: UserId ausente`);
      return res.status(422).json({ mensagem: 'UserId é obrigatório para criar categoria' });
    }
    if (!nome || !tipo) {
      console.warn(`[CREATE CATEGORY] Falha na criação: Nome ou Tipo ausentes`);
      return res.status(422).json({ mensagem: 'Nome e Tipo são obrigatórios para criar categoria' });
    }

    try {
      const categoryId = await _createCategory({ nome, descricao, tipo }, userId);
      console.log(`[CREATE CATEGORY] Categoria criada com sucesso. ID: ${categoryId}`);
      res.status(201).json({ id: categoryId, nome, descricao, tipo, userId });
    } catch (error) {
      console.error(`[CREATE CATEGORY] Erro ao criar categoria para o usuário ID: ${userId}`, error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  },

  async getCategoryById(req, res) {
    const categoryId = req.params.id;
    console.log(`[GET CATEGORY BY ID] Iniciando busca da categoria com ID: ${categoryId}`);
    try {
      const category = await _getCategoryById(categoryId);
      if (category) {
        console.log(`[GET CATEGORY BY ID] Categoria encontrada: ${JSON.stringify(category)}`);
        res.json(category);
      } else {
        console.warn(`[GET CATEGORY BY ID] Categoria não encontrada para o ID: ${categoryId}`);
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(`[GET CATEGORY BY ID] Erro ao buscar categoria com ID: ${categoryId}`, error);
      res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
    }
  },

  async updateCategoryById(req, res) {
    const categoryId = req.params.id;
    console.log(`[UPDATE CATEGORY BY ID] Iniciando atualização da categoria com ID: ${categoryId}`);
    try {
      const affectedRows = await _updateCategoryById(categoryId, req.body);
      if (affectedRows > 0) {
        console.log(`[UPDATE CATEGORY BY ID] Categoria atualizada com sucesso. ID: ${categoryId}`);
        res.json({ mensagem: 'Categoria atualizada com sucesso' });
      } else {
        console.warn(`[UPDATE CATEGORY BY ID] Categoria não encontrada para o ID: ${categoryId}`);
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(`[UPDATE CATEGORY BY ID] Erro ao atualizar categoria com ID: ${categoryId}`, error);
      res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
    }
  },

  async deleteCategoryById(req, res) {
    const categoryId = req.params.id;
    console.log(`[DELETE CATEGORY BY ID] Iniciando exclusão da categoria com ID: ${categoryId}`);
    try {
      const affectedRows = await _deleteCategoryById(categoryId);
      if (affectedRows > 0) {
        console.log(`[DELETE CATEGORY BY ID] Categoria excluída com sucesso. ID: ${categoryId}`);
        res.json({ mensagem: 'Categoria excluída com sucesso' });
      } else {
        console.warn(`[DELETE CATEGORY BY ID] Categoria não encontrada para o ID: ${categoryId}`);
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(`[DELETE CATEGORY BY ID] Erro ao excluir categoria com ID: ${categoryId}`, error);
      res.status(500).json({ mensagem: 'Erro ao excluir categoria' });
    }
  }
};

export const getAllCategories = categoriesController.getAllCategories;
export const createCategory = categoriesController.createCategory;
export const getCategoryById = categoriesController.getCategoryById;
export const updateCategoryById = categoriesController.updateCategoryById;
export const deleteCategoryById = categoriesController.deleteCategoryById;

