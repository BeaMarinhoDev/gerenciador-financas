const express = require('express');
const router = express.Router();
const debitsController = require('../controllers/debitsController');


router.get('/', debitsController.getAllDebits);
router.get('/filtered', debitsController.getDebits);
router.post('/', debitsController.createDebit);
router.get('/:id', debitsController.getDebitById);
router.put('/:id', debitsController.updateDebitById);
router.delete('/:id', debitsController.deleteDebitById);
router.get('/users/:id/debits', debitsController.getDebitsByUserId);
router.get('/categories/:categoryId', debitsController.getDebitsByCategory);


module.exports = router;