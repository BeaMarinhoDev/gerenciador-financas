import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Verifica se a variável de ambiente BACKEND_URL está definida

const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
        title: 'Gerenciador de Finanças API',
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
        { name: 'Auth', description: 'Rotas de autenticação' },
        { name: 'Users', description: 'Gerenciamento de usuários' },
        { name: 'Transactions', description: 'Gerenciamento de transações' },
        { name: 'Credits', description: 'Gerenciamento de créditos' },
        { name: 'Debits', description: 'Gerenciamento de débitos' },
        { name: 'Categories', description: 'Gerenciamento de categorias' },
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
    security: [{ bearerAuth: [] }],
    paths: {
        // Auth Routes
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
                                    email: { type: 'string', example: 'admin@admin.com' },
                                    senha: { type: 'string', example: 'senha123' },
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
                    401: { description: 'Credenciais inválidas' },
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
                                    nome: { type: 'string', example: 'Hugo Santos' },
                                    email: { type: 'string', example: 'hugo.santos@hotmail.com' },
                                    senha: { type: 'string', example: 'senha456' },
                                    cpf: { type: 'string', example: '35193758851' },
                                    cep: { type: 'string', example: '12945130' },
                                    numero: { type: 'string', example: '145' },
                                    complemento: { type: 'string', example: 'Casa 145B' },
                                },
                                required: ['nome', 'email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Usuário registrado com sucesso' },
                    400: { description: 'E-mail já cadastrado' },
                },
            },
        },
        '/auth/logout': {
            post: {
                summary: 'Realiza logout do usuário',
                tags: ['Auth'],
                responses: {
                    200: { description: 'Logout realizado com sucesso' },
                },
            },
        },

        // Users Routes
        '/users': {
            get: {
                summary: 'Retorna todos os usuários',
                tags: ['Users'],
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
            post: {
                summary: 'Cria um novo usuário',
                tags: ['Users'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nome: { type: 'string' },
                                    email: { type: 'string' },
                                    senha: { type: 'string' },
                                    cpf: { type: 'string' },
                                    cep: { type: 'string' },
                                    numero: { type: 'string' },
                                    complemento: { type: 'string' },
                                },
                                required: ['nome', 'email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    201: { description: 'Usuário criado com sucesso' },
                },
            },
        },
        '/users/{id}': {
            get: {
                summary: 'Retorna um usuário pelo ID',
                tags: ['Users'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
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
                    404: { description: 'Usuário não encontrado.' },
                },
            },
            put: {
                summary: 'Atualiza um usuário pelo ID',
                tags: ['Users'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID do usuário',
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nome: { type: 'string' },
                                    email: { type: 'string' },
                                    senha: { type: 'string' },
                                    cpf: { type: 'string' },
                                    cep: { type: 'string' },
                                    numero: { type: 'string' },
                                    complemento: { type: 'string' },
                                },
                                required: ['nome', 'email', 'senha'],
                            },
                        },
                    },
                },
                responses: {
                    200: { description: 'Usuário atualizado com sucesso' },
                    404: { description: 'Usuário não encontrado' },
                },
            },
            delete: {
                summary: 'Remove um usuário pelo ID',
                tags: ['Users'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'integer' },
                        description: 'ID do usuário',
                    },
                ],
                responses: {
                    200: { description: 'Usuário removido com sucesso' },
                    404: { description: 'Usuário não encontrado' },
                },
            },
        },

        // Transactions Routes
        '/users/transactions': {
            get: {
                summary: 'Retorna todas as transações do usuário',
                tags: ['Transactions'],
                responses: {
                    200: {
                        description: 'Lista de transações.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            valor: { type: 'number' },
                                            tipo: { type: 'string' },
                                            descricao: { type: 'string' },
                                            data: { type: 'string', format: 'date' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/users/transactions/recent': {
            get: {
                summary: 'Retorna as transações recentes do usuário',
                tags: ['Transactions'],
                responses: {
                    200: {
                        description: 'Lista de transações recentes.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            valor: { type: 'number' },
                                            tipo: { type: 'string' },
                                            descricao: { type: 'string' },
                                            data: { type: 'string', format: 'date' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // Credits Routes
        '/credits': {
            get: {
                summary: 'Retorna todos os créditos',
                tags: ['Credits'],
                responses: {
                    200: {
                        description: 'Lista de créditos.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            valor: { type: 'number' },
                                            descricao: { type: 'string' },
                                            data_vencimento: { type: 'string', format: 'date' },
                                            category_id: { type: 'integer' },
                                            user_id: { type: 'integer' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // Debits Routes
        '/debits': {
            get: {
                summary: 'Retorna todos os débitos',
                tags: ['Debits'],
                responses: {
                    200: {
                        description: 'Lista de débitos.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            valor: { type: 'number' },
                                            descricao: { type: 'string' },
                                            data_vencimento: { type: 'string', format: 'date' },
                                            category_id: { type: 'integer' },
                                            user_id: { type: 'integer' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        // Categories Routes
        '/categories': {
            get: {
                summary: 'Retorna todas as categorias',
                tags: ['Categories'],
                responses: {
                    200: {
                        description: 'Lista de categorias.',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'integer' },
                                            nome: { type: 'string' },
                                            descricao: { type: 'string' },
                                            tipo: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export default swaggerDefinitions;