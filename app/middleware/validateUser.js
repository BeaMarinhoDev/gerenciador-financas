import { body, validationResult } from 'express-validator';

const validateUser = [
  body('cep')
    .optional()
    .isLength({ max: 15 }).withMessage('O CEP deve ter no máximo 15 caracteres.')
    .matches(/^\d{5}-?\d{3}$/).withMessage('O CEP deve estar no formato válido (ex: 12345-678).'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateUser;