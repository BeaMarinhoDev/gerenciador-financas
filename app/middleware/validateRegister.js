import { body, validationResult } from 'express-validator';

const validateRegister = [
    body('username')
        .notEmpty().withMessage('O nome de usuário é obrigatório.')
        .isLength({ min: 3 }).withMessage('O nome de usuário deve ter pelo menos 3 caracteres.'),
    body('email')
        .notEmpty().withMessage('O e-mail é obrigatório.')
        .isEmail().withMessage('O e-mail deve ser válido.'),
    body('password')
        .notEmpty().withMessage('A senha é obrigatória.')
        .isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateRegister;