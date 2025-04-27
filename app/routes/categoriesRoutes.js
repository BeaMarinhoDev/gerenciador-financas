import { Router } from 'express';
import {
    getAllCategories,
    createCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} from '../controllers/categoriesController.js';
import validateToken from '../middleware/validateToken.js';

const router = Router();

// Rotas de categorias
router.get('/', validateToken, getAllCategories);
router.post('/', validateToken, createCategory);
router.get('/:id', validateToken, getCategoryById);
router.put('/:id', validateToken, updateCategoryById);
router.delete('/:id', validateToken, deleteCategoryById);

export default router;