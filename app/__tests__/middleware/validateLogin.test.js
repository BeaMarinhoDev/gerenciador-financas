import validateLogin from '../../middleware/validateLogin.js';

test('Valida o middleware de login', () => {
    expect(validateLogin).toBeInstanceOf(Array);
    expect(validateLogin.length).toBeGreaterThan(0); // Deve conter validações
});