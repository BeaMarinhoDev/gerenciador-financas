const categoriesModel = require('../models/categoriesModel');

async function getAllCategories(req, res) {
  try {
    const categories = await categoriesModel.getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar categorias' });
  }
}

async function createCategory(req, res) {
    try {
      const userId = req.body.userId;

      if(userId === undefined) {
        res.status(422).json({ mensagem: 'UserId é obrigatório para criar categoria' });
      }
      else {
        const categoryId = await categoriesModel.createCategory(req.body, userId);
        res.status(201).json({ id: categoryId, ...req.body }); // Retorna o ID da categoria  
      } 
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  }

async function getCategoryById(req, res) {
  try {
    const categoryId = req.user.id;
    const category = await categoriesModel.getCategoryById(categoryId);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
  }
}

async function updateCategoryById(req, res) {
  try {
    const affectedRows = await categoriesModel.updateCategoryById(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Categoria atualizada com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Categoria não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar categoria' });
  }
}

async function deleteCategoryById(req, res) {
  try {
    const affectedRows = await categoriesModel.deleteCategoryById(req.params.id);
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
async function get(params) {
  
}

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};

