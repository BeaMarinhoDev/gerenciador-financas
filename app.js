import * as server from './app/config/server.js';

server.app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});