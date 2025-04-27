const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
        title: 'Gerenciador de Finanças API',
        version: '1.0.0',
        description: 'Documentação da API para gerenciamento de finanças pessoais',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor local',
        },
    ],
    tags: [
        {
            name: 'Users',
            description: 'Gerenciamento de usuários',
        },
    ],
    paths: {
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
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: {
                        description: 'Usuário criado com sucesso.',
                    },
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
            put: {
                summary: 'Atualiza um usuário pelo ID',
                tags: ['Users'],
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
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'Usuário atualizado com sucesso.',
                    },
                    404: {
                        description: 'Usuário não encontrado.',
                    },
                },
            },
            delete: {
                summary: 'Exclui um usuário pelo ID',
                tags: ['Users'],
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
                        description: 'Usuário excluído com sucesso.',
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