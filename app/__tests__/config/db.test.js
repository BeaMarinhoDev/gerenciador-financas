import { connect } from '../../config/db.js';

test('Conecta ao banco de dados com sucesso', async () => {
    const connection = await connect();
    expect(connection).toBeDefined();
    await connection.end(); // Fecha a conexão após o teste
});