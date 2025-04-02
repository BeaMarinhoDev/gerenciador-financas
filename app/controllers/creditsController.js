const creditsModel = require('../models/creditsModel');

async function getAllCredits(req, res) {
  try {
    const credits = await creditsModel.getAllCredits();
    res.json(credits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar créditos' });
  }
}

async function createCredit(req, res) {
  try {
    const creditId = await creditsModel.createCredit(req.body);
    res.status(201).json({ id: creditId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar crédito' });
  }
}

async function getCreditById(req, res) {
  try {
    const creditId = req.params.id;
    const credit = await creditsModel.getCreditById(creditId);
    if (credit) {
      res.json(credit);
    } else {
      res.status(404).json({ mensagem: 'Crédito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar crédito' });
  }
}

async function getCreditsByUserId(req, res) {
  try {
    const userId = req.params.id;
    const credits = await creditsModel.getCreditsByUserId(userId);
    res.json(credits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
  }
}

async function updateCreditById(req, res) {
  try {
    const affectedRows = await creditsModel.updateCreditById(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Crédito atualizado com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Crédito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar crédito' });
  }
}

async function deleteCreditById(req, res) {
  try {
    const affectedRows = await creditsModel.deleteCreditById(req.params.id);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Crédito excluído com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Crédito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir crédito' });
  }
}

async function getCreditsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const credits = await creditsModel.getCreditsByCategory(categoryId);
    res.json(credits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar créditos por categoria' });
  }
}

async function getCredits(req, res) {
  try {
    const filters = req.query;
    const sort = req.query.sort;
    const credits = await creditsModel.getCredits(filters, sort);
    res.json(credits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar créditos' });
  }
}

module.exports = {
  getAllCredits,
  createCredit,
  getCreditById,
  updateCreditById,
  deleteCreditById,
  getCreditsByUserId,
  getCreditsByCategory,
  getCredits
};