const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.getAllCategories);
router.post('/', categoriesController.createCategory);
router.get('/:id', categoriesController.getCategoryById);
router.put('/:id', categoriesController.updateCategoryById);
router.delete('/:id', categoriesController.deleteCategoryById);

module.exports = router;