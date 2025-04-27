import {
  getAllCategories as _getAllCategories,
  createCategory as _createCategory,
  getCategoryById as _getCategoryById,
  updateCategoryById as _updateCategoryById,
  deleteCategoryById as _deleteCategoryById
} from '../models/categoriesModel.js';

const categoriesController = {
  async getAllCategories(req, res) {
    try {
      const categories = await _getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar categorias' });
    }
  },

  async createCategory(req, res) {
    try {
      const userId = req.body.userId;

      if (userId === undefined) {
        res.status(422).json({ mensagem: 'UserId é obrigatório para criar categoria' });
      } else {
        const categoryId = await _createCategory(req.body, userId);
        res.status(201).json({ id: categoryId, ...req.body });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  },

  async getCategoryById(req, res) {
    try {
      const categoryId = req.params.id;
      const category = await _getCategoryById(categoryId);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
    }
  },

  async updateCategoryById(req, res) {
    try {
      const affectedRows = await _updateCategoryById(req.params.id, req.body);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Categoria atualizada com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
    }
  },

  async deleteCategoryById(req, res) {
    try {
      const affectedRows = await _deleteCategoryById(req.params.id);
      if (affectedRows > 0) {
        res.json({ mensagem: 'Categoria excluída com sucesso' });
      } else {
        res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao excluir categoria' });
    }
  }
};

export const getAllCategories = categoriesController.getAllCategories;
export const createCategory = categoriesController.createCategory;
export const getCategoryById = categoriesController.getCategoryById;
export const updateCategoryById = categoriesController.updateCategoryById;
export const deleteCategoryById = categoriesController.deleteCategoryById;

