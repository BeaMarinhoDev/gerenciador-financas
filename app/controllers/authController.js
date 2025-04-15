const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcryptjs');

require("dotenv").config();

async function login(req, res) {
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
}

module.exports = {
    login,
};