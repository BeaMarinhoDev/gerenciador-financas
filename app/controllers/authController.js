const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

require("dotenv").config();

const authController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await usersModel.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const senhaCorreta = await bcrypt.compare(senha, user.senha);

            if (senhaCorreta) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });

                return res.status(200).json({
                    id: user.id,
                    token: token
                });
            } else {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ mensagem: 'Erro ao fazer login' });
        }
    },

    async logout(req, res) {
        try {
            res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            res.status(500).json({ mensagem: 'Erro interno ao realizar logout' });
        }
    },

    async register(req, res) {
        try {
            const userId = await usersModel.createUser(req.body);

            return res.status(201).json({ id: userId, ...req.body  });
        } catch (error) {
            console.error(error);
            if (error.message === 'E-mail já cadastrado') {
              res.status(400).json({ mensagem: 'E-mail já cadastrado' }); // Retorna um erro 400 se o e-mail já existir
            } else {
              res.status(500).json({ mensagem: 'Erro ao criar usuário' }); // Retorna um erro 500 para outros erros
            }
        }
    },

}

module.exports = {
    login: authController.login,
    logout: authController.logout,
    register: authController.register,
};