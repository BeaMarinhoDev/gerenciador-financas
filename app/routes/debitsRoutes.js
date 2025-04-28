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
router.get('/', validateToken, getAllDebits); // Retorna todos os débitos
router.get('/filtered', validateToken, getDebits); // Retorna débitos filtrados
router.post('/', validateToken, createDebit); // Cria um novo débito
router.get('/:id', validateToken, getDebitById); // Retorna um débito específico pelo ID
router.put('/:id', validateToken, updateDebitById); // Atualiza um débito específico pelo ID
router.delete('/:id', validateToken, deleteDebitById); // Remove um débito específico pelo ID
router.get('/users/:id/debits', validateToken, getDebitsByUserId); // Retorna todos os débitos de um usuário específico
router.get('/categories/:categoryId', validateToken, getDebitsByCategory); // Retorna todos os débitos de uma categoria específica

export default router;