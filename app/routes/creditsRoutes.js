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
} from '../controllers/creditsController.js';
import validateToken from '../middleware/validateToken.js';

const router = Router();

// Rotas de créditos
router.get('/', validateToken, getAllCredits);
router.get('/filtered', validateToken, getCredits);
router.post('/', validateToken, createCredit);
router.get('/:id', validateToken, getCreditById);
router.put('/:id', validateToken, updateCreditById);
router.delete('/:id', validateToken, deleteCreditById);
router.get('/users/:id/credits', validateToken, getCreditsByUserId);
router.get('/categories/:categoryId', validateToken, getCreditsByCategory);

export default router;