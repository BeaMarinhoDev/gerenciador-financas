import { app } from '../../_config/server.js';

test('Inicializa o servidor Express', () => {
    expect(app).toBeDefined();
    expect(app.use).toBeInstanceOf(Function); // Verifica se o método `use` existe
});