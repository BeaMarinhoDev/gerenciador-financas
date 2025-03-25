const connection = require('../config/db/db');

async function getAllUsers() {
  try {
    // Execute a query using promise
    const db = await connection.connect();

    const [rows, fields] = await db.execute('SELECT * FROM users');
    console.log('Query Result:', rows);

    // Close the connection
    await db.end();

    return rows;
  } catch (err) {
    console.error('Error:', err);
  }
}


async function createUser(user) {
  try {
    // Execute a query using promise
    const db = await connection.connect();
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [user.email]);

        if (existingUser.length > 0) {
            await db.end();
            throw new Error('E-mail já cadastrado'); // Lança um erro se o e-mail já existir
        }


    const { nome, email, senha, cpf, cep, numero, complemento } = user;
    const [result] = await db.execute(
      'INSERT INTO users (nome, email, senha, cpf, cep, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senha, cpf, cep, numero, complemento]
    );

    console.log('Query Result:', result);

    // Close the connection
    await db.end();

    return result.insertId;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

async function getUserById(userId) {
  try {
    // Execute a query using promise
    const db = await connection.connect();

    const [rows, fields] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    console.log('Query Result:', rows);

    // Close the connection
    await db.end();

    if (rows.length > 0)
      return rows[0];
    else
      return null;
  } catch (err) {
    console.error('Error:', err);
  }
}

// Implemente outras funções para atualizar, excluir, etc.

module.exports = {
  getAllUsers,
  createUser,
  getUserById
  // Exporte outras funções
};