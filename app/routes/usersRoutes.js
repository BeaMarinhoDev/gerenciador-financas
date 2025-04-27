import { Router } from 'express';
import {
    getUserTransactions,
    getUserCategories,
    getUserDebits,
    getUserCredits,
    getUserReportsByCategory,
    getUserReportsByPeriod,
    getUserBalance,
    getUserData,
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} from '../controllers/usersController.js';
import {
    getRecentTransactions,
    addCredit,
    addDebit
} from '../controllers/transactionsController.js';
import validateToken from '../middleware/validateToken.js';

const router = Router();

// Rotas de transações do usuário
router.get('/transactions', validateToken, getUserTransactions);
router.get('/transactions/recent', validateToken, getRecentTransactions);
router.post('/transactions/credit', validateToken, addCredit);
router.post('/transactions/debit', validateToken, addDebit);

// Rotas de categorias do usuário
router.get('/categories', validateToken, getUserCategories);

// Rotas de débitos e créditos do usuário
router.get('/debits', validateToken, getUserDebits);
router.get('/credits', validateToken, getUserCredits);

// Rotas de relatórios do usuário
router.get('/reports/category/:categoryId', validateToken, getUserReportsByCategory);
router.get('/reports/period', validateToken, getUserReportsByPeriod);

// Rota de balanço do usuário
router.get('/balance', validateToken, getUserBalance);

// Rota para dados do usuário autenticado
router.get('/user', validateToken, getUserData);

// Rotas gerais de usuários
router.get('/', validateToken, getAllUsers);
router.post('/', validateToken, createUser);
router.get('/:id', validateToken, getUserById);
router.put('/:id', validateToken, updateUserById);
router.delete('/:id', validateToken, deleteUserById);

export default router;