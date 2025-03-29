const express = require('express');
const router = express.Router();
const creditsController = require('../controllers/creditsController');

router.get('/', creditsController.getAllCredits);
router.post('/', creditsController.createCredit);
router.get('/:id', creditsController.getCreditById);
router.put('/:id', creditsController.updateCreditById);
router.delete('/:id', creditsController.deleteCreditById);

module.exports = router;