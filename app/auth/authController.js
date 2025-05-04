import jsonwebtoken from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../users/usersModel.js';
import { compare } from 'bcryptjs';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

const { sign } = jsonwebtoken; // Desestrutura o método `sign` do módulo

const authController = {
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const user = await getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const senhaCorreta = await compare(senha, user.senha);

            if (senhaCorreta) {
                const token = sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });

                return res.status(200).json({
                    id: user.id,
                    name: user.nome,
                    token: token,
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
            const userId = await createUser(req.body);

            return res.status(201).json({ id: userId, ...req.body });
        } catch (error) {
            console.error(error);
            if (error.message === 'E-mail já cadastrado') {
                res.status(400).json({ mensagem: 'E-mail já cadastrado' });
            } else {
                res.status(500).json({ mensagem: 'Erro ao criar usuário' });
            }
        }
    },
};

export const login = authController.login;
export const logout = authController.logout;
export const register = authController.register;