const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authMiddleware');

const usersController = require('../controllers/usersController');
const transactionsController = require('../controllers/transactionsController');

router.get('/transactions', authenticateToken, usersController.getUserTransactions);
router.get('/categories', authenticateToken, usersController.getUserCategories);
router.get('/debits', authenticateToken, usersController.getUserDebits);
router.get('/credits', authenticateToken, usersController.getUserCredits);
router.get('/reports/category/:categoryId', authenticateToken, usersController.getUserReportsByCategory);
router.get('/reports/period', authenticateToken, usersController.getUserReportsByPeriod);
router.get('/balance', authenticateToken, usersController.getUserBalance);
router.get('/transactions/recent', authenticateToken, transactionsController.getRecentTransactions);
router.post('/transactions/credit', authenticateToken, transactionsController.addCredit);
router.post('/transactions/debit', authenticateToken, transactionsController.addDebit);

router.get('/user', authenticateToken, usersController.getUserData);

// Rotas de usuários (protegidas por autenticação)
router.get('/', authenticateToken, usersController.getAllUsers);
router.post('/', authenticateToken, usersController.createUser);
router.get('/:id', authenticateToken, usersController.getUserById);
router.put('/:id', authenticateToken, usersController.updateUserById);
router.delete('/:id', authenticateToken, usersController.deleteUserById);



module.exports = router;