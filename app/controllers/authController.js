const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

require("dotenv").config();

async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const user = await usersModel.loginUser(email, senha);

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }
}

module.exports = {
  login,
};