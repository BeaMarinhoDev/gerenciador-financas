const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');
const transactionsController = require('../controllers/transactionsController');
const usersModel = require('../models/usersModel');

// Rotas de autenticação (sem autenticação)
router.post('/login', authController.login); // Ou usersController.loginUser, dependendo de onde está a lógica final de login

router.get('/transactions', authenticateToken, usersController.getUserTransactions);
router.get('/categories', authenticateToken, usersController.getUserCategories);
router.get('/debits', authenticateToken, usersController.getUserDebits);
router.get('/credits', authenticateToken, usersController.getUserCredits);
router.get('/reports/category/:categoryId', authenticateToken, usersController.getUserReportsByCategory);
router.get('/reports/period', authenticateToken, usersController.getUserReportsByPeriod);
router.get('/balance', authenticateToken, usersController.getUserBalance);
router.get('/transactions/recent', authenticateToken, transactionsController.getRecentTransactions);

router.get('/user', authenticateToken, usersController.getUserData);

// Rotas de usuários (protegidas por autenticação)
router.get('/', authenticateToken, usersController.getAllUsers);
router.post('/', usersController.createUser); // Decida se a criação requer autenticação ou não
router.get('/:id', authenticateToken, usersController.getUserById);
router.put('/:id', authenticateToken, usersController.updateUserById);
router.delete('/:id', authenticateToken, usersController.deleteUserById);



module.exports = router;