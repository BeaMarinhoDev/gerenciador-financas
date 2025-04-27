import { Router } from 'express';
import {
    getAllDebits,
    getDebits,
    createDebit,
    getDebitById,
    updateDebitById,
    deleteDebitById,
    getDebitsByUserId,
    getDebitsByCategory
} from '../controllers/debitsController.js';
import validateToken from '../middleware/validateToken.js';

const router = Router();

// Rotas de débitos
router.get('/', validateToken, getAllDebits);
router.get('/filtered', validateToken, getDebits);
router.post('/', validateToken, createDebit);
router.get('/:id', validateToken, getDebitById);
router.put('/:id', validateToken, updateDebitById);
router.delete('/:id', validateToken, deleteDebitById);
router.get('/users/:id/debits', validateToken, getDebitsByUserId);
router.get('/categories/:categoryId', validateToken, getDebitsByCategory);

export default router;