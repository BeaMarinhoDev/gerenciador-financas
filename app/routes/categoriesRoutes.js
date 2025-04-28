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
router.get('/', validateToken, getAllCategories); // Retorna todas as categorias
router.post('/', validateToken, createCategory); // Cria uma nova categoria
router.get('/:id', validateToken, getCategoryById); // Retorna uma categoria específica pelo ID
router.put('/:id', validateToken, updateCategoryById); // Atualiza uma categoria específica pelo ID
router.delete('/:id', validateToken, deleteCategoryById); // Remove uma categoria específica pelo ID

export default router;