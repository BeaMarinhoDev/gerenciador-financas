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
async function updateUserById(id, user) {
  try {
    const db = await connection.connect();
    const { nome, email, senha, cpf, cep, numero, complemento } = user;
    const [result] = await db.execute(
      'UPDATE users SET nome = ?, email = ?, senha = ?, cpf = ?, cep = ?, numero = ?, complemento = ? WHERE id = ?',
      [nome, email, senha, cpf, cep, numero, complemento, id]
    );
    await db.end();
    return result.affectedRows; // Retorna o número de linhas afetadas
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}
async function deleteUserById(id) {
  try {
    const db = await connection.connect();
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows; // Retorna o número de linhas afetadas
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}
async function getUserCategories(userId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `select c.*, uc.user_id from categories c 
        inner join users_categories uc on uc.category_id = c.id
        where uc.user_id = ?`,
      [userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserCategories
};


