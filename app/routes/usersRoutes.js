const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');


//Rotas de autenticação
router.get('/', authenticateToken, usersController.getAllUsers);
router.get('/:id', authenticateToken, usersController.getUserById);
router.put('/:id', authenticateToken, usersController.updateUserById);
router.delete('/:id', authenticateToken, usersController.deleteUserById);
router.post('/login', authController.login);

// Rotas users, credits e debits
router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);
router.get('/:id/categories', usersController.getUserCategories);
router.get('/:id/debits', usersController.getUserDebits);
router.get('/:id/credits', usersController.getUserCredits);
router.get('/:id/transactions', usersController.getUserTransactions);
router.get('/:id/balance', usersController.getUserBalance);
router.get('/:id/reports/category/:categoryId', usersController.getUserReportsByCategory);
router.get('/:id/reports/period', usersController.getUserReportsByPeriod);




//Criar as rotas                                                      
// /users/:id/debits
// /users/:id/credits
// a ideia é ter os débitos e créditos de um usuario,
// junte a tabela de debits + users e credits + user, pq quero o userid e o nome dele + lista de credito / debito

module.exports = router;


 