import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Verifica se a variável de ambiente BACKEND_URL está definida

const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
        title: 'Gerenciador de Finanças API ',//removido "Local"',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de finanças pessoais',
    },
    servers: [
        {
            url: `${process.env.BACKEND_URL}:${process.env.HTTP_PORT}`, // Usa o endpoint dinâmico
            description: 'Servidor local',
        },
    ],
    tags: [
        {
            name: 'Auth',
            description: 'Rotas de autenticação',
        },
        {
            name: 'Users',
            description: 'Gerenciamento de usuários',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    paths: {
        '/auth/login': {
            post: {
                summary: 'Realiza login do usuário',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: {
                                        type: 'string',
                                        example: 'admin@admin.com',
                                    },
                                    senha: {
                                        type: 'string',
                                        example: 'senha123',
                                    },
                                },
                                required: ['email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Login realizado com sucesso',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        name: { type: 'string' },
                                        token: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    401: {
                        description: 'Credenciais inválidas',
                    },
                },
            },
        },
        '/auth/register': {
            post: {
                summary: 'Registra um novo usuário',
                tags: ['Auth'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nome: {
                                        type: 'string',
                                        example: 'Hugo Santos',
                                    },
                                    email: {
                                        type: 'string',
                                        example: 'hugo.santos@hotmail.com',
                                    },
                                    senha: {
                                        type: 'string',
                                        example: 'senha456',
                                    },
                                    cpf: {
                                        type: 'string',
                                        example: '35193758851',
                                    },
                                    cep: {
                                        type: 'string',
                                        example: '12945130',
                                    },
                                    numero: {
                                        type: 'string',
                                        example: '145',
                                    },
                                    complemento: {
                                        type: 'string',
                                        example: 'Casa 145B',
                                    },
                                },
                                required: ['nome', 'email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuário registrado com sucesso',
                    },
                    400: {
                        description: 'E-mail já cadastrado',
                    },
                },
            },
        },
        '/auth/logout': {
            post: {
                summary: 'Realiza logout do usuário',
                tags: ['Auth'],
                responses: {
                    200: {
                        description: 'Logout realizado com sucesso',
                    },
                },
            },
        },
        '/users': {
            get: {
                summary: 'Retorna todos os usuários',
                tags: ['Users'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                responses: {
                    200: {
                        description: 'Lista de usuários.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            nome: { type: 'string' },
                                            email: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/users/{id}': {
            get: {
                summary: 'Retorna um usuário pelo ID',
                tags: ['Users'],
                security: [
                    {
                        bearerAuth: [],
                    },
                ],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: {
                            type: 'integer',
                        },
                        description: 'ID do usuário',
                    },
                ],
                responses: {
                    200: {
                        description: 'Usuário encontrado.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        nome: { type: 'string' },
                                        email: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Usuário não encontrado.',
                    },
                },
            },
        },
    },
};

export default swaggerDefinitions;