import { connect } from '../config/db.js';
import { hash, compare } from 'bcryptjs';

export const getAllUsers = async () => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM users');
    await db.end();
    return rows;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const createUser = async (user) => {
  try {
    const { nome, email, senha, cpf, cep, numero, complemento } = user;
    const emailCleaned = email.trim();
    const nomeCleaned = nome.trim();
    const hashedPassword = await hash(senha, 10);
    const cpfCleaned = cpf.replace(/\D/g, '');
    const cepCleaned = cep.replace(/\D/g, '');
    const numeroCleaned = numero.replace(/\D/g, '');
    const complementoCleaned = complemento ? complemento.trim() : null;

    const db = await connect();
    const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [emailCleaned]);
    if (existingUser.length > 0) {
      await db.end();
      throw new Error('E-mail já cadastrado');
    }

    const [result] = await db.execute(
      'INSERT INTO users (nome, email, senha, cpf, cep, numero, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nomeCleaned, emailCleaned, hashedPassword, cpfCleaned, cepCleaned, numeroCleaned, complementoCleaned]
    );
    await db.end();
    return result.insertId;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const loginUser = async (email, senha) => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    await db.end();

    if (rows.length === 0) {
      throw new Error('Usuário não encontrado');
    }

    const user = rows[0];
    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
      throw new Error('Senha incorreta');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    await db.end();
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const updateUserById = async (id, user) => {
  try {
    const db = await connect();
    const { nome, email, senha, cpf, cep, numero, complemento } = user;

    let hashedPassword = null;
    if (senha) {
      hashedPassword = await hash(senha, 10); // Gera o hash apenas se a senha for fornecida
    }

    const query = `
      UPDATE users
      SET
        nome = ?,
        email = ?,
        ${senha ? 'senha = ?,' : ''} -- Atualiza a senha apenas se ela for fornecida
        cpf = ?,
        cep = ?,
        numero = ?,
        complemento = ?
      WHERE id = ?
    `;

    const params = [
      nome,
      email,
      ...(senha ? [hashedPassword] : []), // Adiciona o hash da senha apenas se ela for fornecida
      cpf,
      cep,
      numero,
      complemento,
      id,
    ];

    const [result] = await db.execute(query, params);
    await db.end();
    return result.affectedRows;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const deleteUserById = async (id) => {
  try {
    const db = await connect();
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
    await db.end();
    return result.affectedRows;
  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
};

export const getUserCategories = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT c.*, uc.user_id FROM categories c 
       INNER JOIN users_categories uc ON uc.category_id = c.id
       WHERE uc.user_id = ?`,
      [userId]
    );
    await db.end();
    return rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserBalance = async (userId) => {
  try {
    const db = await connect();
    const [rows] = await db.execute(
      `SELECT
        (SELECT COALESCE(SUM(valor), 0) FROM credits WHERE user_id = ?) -
        (SELECT COALESCE(SUM(valor), 0) FROM debits WHERE user_id = ?) AS balance`,
      [userId, userId]
    );
    await db.end();
    return rows[0].balance; // Retorna o saldo calculado
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserReportsByCategory = async (userId, categoryId) => {
  try {
    const db = await connect();
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
};

export const getUserReportsByPeriod = async (userId, startDate, endDate) => {
  try {
    const db = await connect();
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
};

export const getUserByEmail = async (email) => {
  try {
    const db = await connect();
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    await db.end();
    return rows[0];
  } catch (err) {
    console.error('Erro ao buscar usuário por e-mail:', err);
    throw err;
  }
};


