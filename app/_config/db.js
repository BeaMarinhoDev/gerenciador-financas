import { createConnection } from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

export async function connect() {
    return await createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
}