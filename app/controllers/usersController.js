const usersModel = require('../models/usersModel');

async function getAllUsers(req, res) {
  try {
    const users = await usersModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar usuários' });
  }
}

async function createUser(req, res) {
  try {
      const userId = await usersModel.createUser(req.body);
      res.status(201).json({ id: userId, ...req.body });
  } catch (error) {
      console.error(error);
      if (error.message === 'E-mail já cadastrado') {
          res.status(400).json({ mensagem: 'E-mail já cadastrado' }); // Retorna um erro 400 se o e-mail já existir
      } else {
          res.status(500).json({ mensagem: 'Erro ao criar usuário' }); // Retorna um erro 500 para outros erros
      }
  }
}

async function getUserById(req, res) {
  try {
    const userId = await usersModel.createUser(req.body);
    res.status(201).json({ id: userId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao criar usuário' });
  }
  return userId;
}


// Implemente outras funções para atualizar, excluir, etc.

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  // Importe outras funções
};
  // Exporte outras funções
