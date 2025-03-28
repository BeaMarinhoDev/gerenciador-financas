const debitsModel = require('../models/debitsModel');

async function getAllDebits(req, res) {
  try {
    const debits = await debitsModel.getAllDebits();
    res.json(debits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débitos' });
  }
}

async function createDebit(req, res) {
  try {
    const debitId = await debitsModel.createDebit(req.body);
    res.status(201).json({ id: debitId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar débito' });
  }
}

async function getDebitById(req, res) {
  try {
    const debitId = req.params.id;
    const debit = await debitsModel.getDebitById(debitId);
    if (debit) {
      res.json(debit);
    } else {
      res.status(404).json({ mensagem: 'Débito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débito' });
  }
}

async function updateDebitById(req, res) {
  try {
    const affectedRows = await debitsModel.updateDebitById(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Débito atualizado com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Débito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao atualizar débito' });
  }
}

async function deleteDebitById(req, res) {
  try {
    const affectedRows = await debitsModel.deleteDebitById(req.params.id);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Débito excluído com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Débito não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir débito' });
  }
}

module.exports = {
  getAllDebits,
  createDebit,
  getDebitById,
  updateDebitById,
  deleteDebitById
};