const connection = require('../config/db/db');
const bcrypt = require('bcryptjs');

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
      throw new Error('E-mail já cadastrado');
    }  
    
    const { nome, email, senha, cpf, cep, numero, complemento } = user;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const [result] = await db.execute(
      'INSERT INTO users (nome, email, senha, cpf, cep, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, email, hashedPassword, cpf, cep, numero, complemento]
    );
    console.log('Query Result:', result);
    await db.end();
    return result.insertId;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}

async function loginUser(email, senha) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    await db.end();

    if (rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(senha, user.senha);

    //TODO: Caso precise testar uma senha criptografada
    //console.log('Password:', await bcrypt.hash(senha, 10));

    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
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

async function getUserBalance(userId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT
        (SELECT COALESCE(SUM(valor), 0) FROM credits WHERE user_id = ?) -
        (SELECT COALESCE(SUM(valor), 0) FROM debits WHERE user_id = ?) AS balance`,
      [userId, userId]
    );
    await db.end();
    return rows[0].balance;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserReportsByCategory(userId, categoryId) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT
        'débito' AS tipo,
        d.valor,
        d.data_vencimento AS data
      FROM debits d
      WHERE d.user_id = ? AND d.category_id = ?
      UNION ALL
      SELECT
        'crédito' AS tipo,
        c.valor,
        c.data_vencimento AS data
      FROM credits c
      WHERE c.user_id = ? AND c.category_id = ?
      ORDER BY data DESC`,
      [userId, categoryId, userId, categoryId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getUserReportsByPeriod(userId, startDate, endDate) {
  try {
    const db = await connection.connect();
    const [rows] = await db.execute(
      `SELECT
        'débito' AS tipo,
        d.valor,
        d.data_vencimento AS data
      FROM debits d
      WHERE d.user_id = ? AND d.data_vencimento BETWEEN ? AND ?
      UNION ALL
      SELECT
        'crédito' AS tipo,
        c.valor,
        c.data_vencimento AS data
      FROM credits c
      WHERE c.user_id = ? AND c.data_vencimento BETWEEN ? AND ?
      ORDER BY data DESC`,
      [userId, startDate, endDate, userId, startDate, endDate]
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
  getUserCategories,
  getUserBalance,
  getUserReportsByCategory,
  getUserReportsByPeriod,
  loginUser
};


