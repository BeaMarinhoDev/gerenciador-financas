import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Limite de conexões no pool
    queueLimit: 0, // Sem limite para a fila de conexões
});

export async function connect() {
    return pool; // Retorna o pool de conexões
}