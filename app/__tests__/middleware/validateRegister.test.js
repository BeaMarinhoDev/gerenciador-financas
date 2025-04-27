import validateRegister from '../../middleware/validateRegister.js';

test('Valida o middleware de registro', () => {
    expect(validateRegister).toBeInstanceOf(Array);
    expect(validateRegister.length).toBeGreaterThan(0); // Deve conter validações
});