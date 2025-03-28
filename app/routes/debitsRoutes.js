const express = require('express');
const router = express.Router();
const debitsController = require('../controllers/debitsController');

router.get('/', debitsController.getAllDebits);
router.post('/', debitsController.createDebit);
router.get('/:id', debitsController.getDebitById);
router.put('/:id', debitsController.updateDebitById);
router.delete('/:id', debitsController.deleteDebitById);

module.exports = router;