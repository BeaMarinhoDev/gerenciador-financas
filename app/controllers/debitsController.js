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

async function getDebitsByUserId(req, res) {
  try {
    const userId = req.params.id;
    const debits = await debitsModel.getDebitsByUserId(userId);
    res.json(debits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
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

async function getDebitsByCategory(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const debits = await debitsModel.getDebitsByCategory(categoryId);
    res.json(debits);
    console.log(debits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débitos por categoria' });
  }
}

async function getDebits(req, res) {
  try {
    const filters = req.query;
    const sort = req.query.sort;
    const limit = parseInt(req.query.limit) || 10; 
    const offset = parseInt(req.query.offset) || 0; 
    const debits = await debitsModel.getDebits(filters, sort, limit, offset);
    res.json(debits);
    console.log(filters, sort);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débitos' });
  }
}

module.exports = {
  getAllDebits,
  createDebit,
  getDebitById,
  updateDebitById,
  deleteDebitById,
  getDebitsByUserId,
  getDebitsByCategory,
  getDebits
};