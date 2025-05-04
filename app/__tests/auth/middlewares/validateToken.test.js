import validateToken from '../../middleware/validateToken.js';

test('Valida o middleware de token', () => {
    expect(validateToken).toBeInstanceOf(Function); // Deve ser uma função
});