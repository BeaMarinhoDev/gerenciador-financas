const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);
router.get('/:id/categories', usersController.getUserCategories);
router.get('/:id/debits', usersController.getUserDebits);
router.get('/:id/credits', usersController.getUserCredits);
router.get('/:id/transactions', usersController.getUserTransactions);




//Criar as rotas                                                      
// /users/:id/debits
// /users/:id/credits
// a ideia é ter os débitos e créditos de um usuario,
// junte a tabela de debits + users e credits + user, pq quero o userid e o nome dele + lista de credito / debito

module.exports = router;


 