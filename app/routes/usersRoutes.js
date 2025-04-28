import { Router } from 'express';
import {
    getUserTransactions,
    getRecentTransactions,
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
    deleteUserById,
} from '../controllers/usersController.js';
import validateToken from '../middleware/validateToken.js';

const router = Router();

// Transações do usuário
router.get('/transactions', validateToken, getUserTransactions);
router.get('/transactions/recent', validateToken, getRecentTransactions);

// Categorias do usuário
router.get('/categories', validateToken, getUserCategories);

// Débitos e créditos do usuário
router.get('/debits', validateToken, getUserDebits);
router.get('/credits', validateToken, getUserCredits);

// Relatórios do usuário
router.get('/reports/category/:categoryId', validateToken, getUserReportsByCategory);
router.get('/reports/period', validateToken, getUserReportsByPeriod);

// Balanço do usuário
router.get('/balance', validateToken, getUserBalance);

// Dados do usuário autenticado
router.get('/user', validateToken, getUserData);

// Rotas gerais de usuários
router.get('/', validateToken, getAllUsers);
router.post('/', validateToken, createUser);
router.get('/:id', validateToken, getUserById);
router.put('/:id', validateToken, updateUserById);
router.delete('/:id', validateToken, deleteUserById);

export default router;