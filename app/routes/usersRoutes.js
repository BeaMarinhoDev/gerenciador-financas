const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUserById);
router.delete('/:id', usersController.deleteUserById);

module.exports = router;

//     //TODO: 
//     // 1. criar rotas de GET /users/:id para pegar o usuario pelo id informado - sem body, retornar somente o do id quando encontrado
//     // 2. criar rotas de PUT /users/:id para atualizar o usuario pelo id informado, com os campos do req.body
//     // 3. criar rotas de DELETE /users/:id para apagar/excluir/deletar o usuario pelo id informado
 