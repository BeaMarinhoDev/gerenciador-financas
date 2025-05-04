import * as server from './app/_config/server.js';
import dotenv from 'dotenv';

dotenv.config();

// Usa a porta dinâmica do .env
const PORT = process.env.HTTP_PORT || 3000;

server.app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});