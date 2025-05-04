import jsonwebtoken from 'jsonwebtoken';
import { getUserByEmail, createUser } from '../users/usersModel.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const { sign } = jsonwebtoken;

// Carrega as variáveis de ambiente
dotenv.config();

const authController = {
    async login(req, res) {
        const { email, senha } = req.body;
        console.log(`[LOGIN] Iniciando login para o email: ${email}`);

        // Validação de entrada
        if (!email || !senha) {
            console.warn(`[LOGIN] Falha no login: Campos obrigatórios ausentes`);
            return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });
        }

        try {
            const user = await getUserByEmail(email);

            if (!user) {
                console.warn(`[LOGIN] Falha no login: Usuário não encontrado para o email: ${email}`);
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }

            const senhaCorreta = await bcrypt.compare(senha, user.senha);

            if (senhaCorreta) {
                const token = sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });

                console.log(`[LOGIN] Login bem-sucedido para o email: ${email}`);
                return res.status(200).json({
                    id: user.id,
                    name: user.nome,
                    token: token,
                });
            } else {
                console.warn(`[LOGIN] Falha no login: Senha incorreta para o email: ${email}`);
                return res.status(401).json({ mensagem: 'Credenciais inválidas' });
            }
        } catch (error) {
            console.error(`[LOGIN] Erro ao fazer login para o email: ${email}`, error);
            return res.status(500).json({ mensagem: 'Erro ao fazer login' });
        }
    },

    async logout(req, res) {
        console.log(`[LOGOUT] Iniciando logout`);
        try {
            console.log(`[LOGOUT] Logout realizado com sucesso`);
            return res.status(200).json({ mensagem: 'Logout realizado com sucesso' });
        } catch (error) {
            console.error(`[LOGOUT] Erro ao realizar logout`, error);
            return res.status(500).json({ mensagem: 'Erro interno ao realizar logout' });
        }
    },

    async register(req, res) {
        const { email, nome, senha } = req.body;
        console.log(`[REGISTER] Iniciando registro para o email: ${email}`);

        // Validação de entrada
        if (!email || !nome || !senha) {
            console.warn(`[REGISTER] Falha no registro: Campos obrigatórios ausentes`);
            return res.status(400).json({ mensagem: 'Nome, email e senha são obrigatórios' });
        }

        try {
            const userId = await createUser(req.body);

            console.log(`[REGISTER] Registro bem-sucedido para o email: ${email}`);
            return res.status(201).json({ id: userId, ...req.body });
        } catch (error) {
            console.error(`[REGISTER] Erro ao registrar usuário para o email: ${email}`, error);
            if (error.message === 'E-mail já cadastrado') {
                console.warn(`[REGISTER] Falha no registro: E-mail já cadastrado (${email})`);
                return res.status(400).json({ mensagem: 'E-mail já cadastrado' });
            } else {
                return res.status(500).json({ mensagem: 'Erro ao criar usuário' });
            }
        }
    },
};

export const login = authController.login;
export const logout = authController.logout;
export const register = authController.register;