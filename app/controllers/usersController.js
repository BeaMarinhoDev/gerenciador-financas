const usersModel = require('../models/usersModel');
const debitsModel = require('../models/debitsModel');
const creditsModel = require('../models/creditsModel');
const transactionsModel = require('../models/transactionsModel');

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
    const userId = req.params.id;
    const user = await usersModel.getUserById(userId);
    
    if (user !== null)
      res.json(user);
    else
      res.status(404).json({ mensagem: 'Nao foi encontrado o usuário ' + userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar o usuário ' + userId });
  }
}
async function updateUserById(req, res) {
  try {
      const affectedRows = await usersModel.updateUserById(req.params.id, req.body);
      if (affectedRows > 0) {
          res.json({ mensagem: 'Usuário atualizado com sucesso' });
      } else {
          res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao atualizar usuário' });
  }
}
async function deleteUserById(req, res) {
  try {
    const affectedRows = await usersModel.deleteUserById(req.params.id);
    if (affectedRows > 0) {
      res.json({ mensagem: 'Usuário excluído com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao excluir usuário' });
  }
}
async function getUserCategories(req, res) {
  try {
    const userId = req.user.id;
    const categories = await usersModel.getUserCategories(userId);
    console.log('Categories:', categories);
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar categorias do usuário' });
  }
}

async function getUserDebits(req, res) {
  try {
    const userId = req.user.id;
    const debits = await debitsModel.getDebitsByUserId(userId);
    res.json(debits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar débitos do usuário' });
  }
}

async function getUserCredits(req, res) {
  try {
    const userId = req.user.id;
    const credits = await creditsModel.getCreditsByUserId(userId);
    res.json(credits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar créditos do usuário' });
  }
}

async function getUserTransactions(req, res) {
  try {
      const userId = req.user.id; // Pega o ID do usuário autenticado do token
      console.log('User ID:', userId); // Log para verificar o ID do usuário
      const transactions = await transactionsModel.getTransactionsByUserId(userId);
      res.json(transactions);
  } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao buscar transações do usuário' });
  }
}

async function getUserBalance(req, res) {
  try {
    const userId = req.user.id;
    const balance = await usersModel.getUserBalance(userId);
    res.json({ balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar balanço do usuário' });
  }
}

async function getUserReportsByCategory(req, res) {
  try {
    const userId = req.user.id;
    const categoryId = req.params.categoryId;
    const reports = await usersModel.getUserReportsByCategory(userId, categoryId);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar relatórios por categoria' });
  }
}

async function getUserReportsByPeriod(req, res) {
  try {
    const userId = req.user.id;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const reports = await usersModel.getUserReportsByPeriod(userId, startDate, endDate);
    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar relatórios por período' });
  }
}
async function loginUser(req, res) {
  const { email, senha } = req.body;

  try {
      const user = await usersModel.getUserByEmail(email);

      if (user) {
          const senhaCorreta = await bcrypt.compare(senha, user.senha);

          if (senhaCorreta) {
                     
              return res.status(200).json({ success: true });
          }
      }

      return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });

  } catch (error) {
      console.error('Erro ao fazer login:', error);
      return res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
}
async function getUserData(req, res) {
  try {
      // O middleware authenticateToken já colocou as informações do usuário decodificadas do token em req.user
      const userId = req.user.id;
      const user = await usersModel.getUserById(userId);

      if (user) {
          return res.json({ nome: user.nome });
      } else {
          return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
  } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserCategories,
  getUserDebits,
  getUserCredits,
  getUserTransactions,
  getUserBalance,
  getUserReportsByCategory,
  getUserReportsByPeriod,
  loginUser,
  getUserData
};

