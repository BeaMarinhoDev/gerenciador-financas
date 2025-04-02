const express = require('express');
const router = express.Router();
const creditsController = require('../controllers/creditsController');

router.get('/', creditsController.getAllCredits);
router.get('/filtered', creditsController.getCredits);
router.post('/', creditsController.createCredit);
router.get('/:id', creditsController.getCreditById);
router.put('/:id', creditsController.updateCreditById);
router.delete('/:id', creditsController.deleteCreditById);
router.get('/users/:id/credits', creditsController.getCreditsByUserId);
router.get('/categories/:categoryId', creditsController.getCreditsByCategory);


module.exports = router;