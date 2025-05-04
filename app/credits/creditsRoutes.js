import { Router } from 'express';
import {
    getAllCredits,
    getCredits,
    createCredit,
    getCreditById,
    updateCreditById,
    deleteCreditById,
    getCreditsByUserId,
    getCreditsByCategory
} from '../credits/creditsController.js';
import validateToken from '../auth/middlewares/validateToken.js';

const router = Router();

// Rotas de créditos
router.get('/', validateToken, getAllCredits); // Retorna todos os créditos
router.get('/filtered', validateToken, getCredits); // Retorna créditos filtrados
router.post('/', validateToken, createCredit); // Cria um novo crédito
router.get('/:id', validateToken, getCreditById); // Retorna um crédito específico pelo ID
router.put('/:id', validateToken, updateCreditById); // Atualiza um crédito específico pelo ID
router.delete('/:id', validateToken, deleteCreditById); // Remove um crédito específico pelo ID
router.get('/users/:id/credits', validateToken, getCreditsByUserId); // Retorna todos os créditos de um usuário específico
router.get('/categories/:categoryId', validateToken, getCreditsByCategory); // Retorna todos os créditos de uma categoria específica

export default router;