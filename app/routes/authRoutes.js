const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController'); // Controller para autenticação

// Rotas de autenticação
router.post('/login', authController.login); // Ou usersController.loginUser, dependendo de onde está a lógica final de login
router.post('/logout', authController.logout); // Ou usersController.logoutUser, dependendo de onde está a lógica final de logout
router.post('/register', authController.register); // Ou usersController.registerUser, dependendo de onde está a lógica final de registro

module.exports = router;