const mysql = require('mysql2/promise');

async function connect() {
    return await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '031413',
        database: 'gerenciador_financas'
    });
}

module.exports = {
    connect
}