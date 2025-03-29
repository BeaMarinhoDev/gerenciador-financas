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

module.exports = {
  getAllCredits,
  createCredit,
  getCreditById,
  updateCreditById,
  deleteCreditById,
};