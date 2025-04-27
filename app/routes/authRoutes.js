import { Router } from 'express';
import { 
    login, 
    logout, 
    register 
} from '../controllers/authController.js';
import validateLogin from '../middleware/validateLogin.js';
import validateRegister from '../middleware/validateRegister.js';

const router = Router();

// Rotas de autenticação
// Login do usuário
router.post('/login', validateLogin, login);

// Logout do usuário
router.post('/logout', logout);

// Registro de novo usuário
router.post('/register', validateRegister, register);

export default router;