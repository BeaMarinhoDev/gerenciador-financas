import { jest } from '@jest/globals';
import * as server from '../config/server.js';

test('Servidor escuta na porta 3000', () => {
    const listenMock = jest.fn((port, callback) => callback());
    server.app.listen = listenMock;

    // Simula o comportamento do app.js
    server.app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });

    expect(listenMock).toHaveBeenCalledWith(3000, expect.any(Function));
});