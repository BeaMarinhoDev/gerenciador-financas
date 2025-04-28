# Gerenciador de Finanças

API para gerenciamento de finanças pessoais, permitindo o controle de receitas, despesas e saldos.

## Funcionalidades

- Cadastro de usuários
- Autenticação com JWT
- Gerenciamento de receitas e despesas
- Relatórios financeiros

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL
- Docker e Docker Compose

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/BeaMarinhoDev/gerenciador-financas.git
   cd gerenciador-financas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```properties
   # Configurações do banco de dados
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=root
   DB_NAME=gerenciador_financas

   # Secrets para JWT
   JWT_SECRET=x34sdjsdsDSsdd
   JWT_EXPIRES_IN=1h

   # Configurações do servidor
   HTTP_PORT=3001
   BACKEND_URL=http://localhost
   ```

   Essas variáveis são usadas para configurar a conexão com o banco de dados e para autenticação com JWT.

   **Observação:** Certifique-se de confirmar a porta, host, usuário e senha do seu MySQL antes de configurar as variáveis de ambiente.

4. Configure o banco de dados:
   - Certifique-se de que o MySQL esteja rodando.
   - Use o script SQL localizado em `helpers/estrutura.sql` para criar o banco de dados e as tabelas necessárias:
     ```bash
     mysql -u root -p < helpers/estrutura.sql
     ```

## Uso

### Ambiente de Desenvolvimento

Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

### Ambiente de Produção

Inicie o servidor:
```bash
npm start
```

### Testes

Execute os testes automatizados:
```bash
npm test
```

## Endpoints

A coleção do Postman `helpers/gerenciador_financas API.postman_collection.json` contém exemplos de requisições para todos os endpoints disponíveis.

## Executando com Docker

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.  
   - Para instalar o Docker, siga as instruções no site oficial: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/).  
   - Para instalar o Docker Compose, siga as instruções em: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

2. Configure as variáveis de ambiente:  
   Certifique-se de que o arquivo `.env` na raiz do projeto contém as variáveis mencionadas acima.

3. Construa e inicie os containers:
   ```bash
   docker-compose up --build
   ```

4. Acesse a aplicação:
   - A API estará disponível em `http://localhost:3000` (ou na porta configurada no `.env`).
   - A documentação do Swagger estará disponível em `http://localhost:3000/api-docs`.


## Estrutura do Projeto

- `app.js`: Arquivo principal da aplicação.
- `app/config/db.js`: Configuração de conexão com o banco de dados.
- `helpers/estrutura.sql`: Script SQL para configuração do banco de dados.
- `helpers/gerenciador_financas API.postman_collection.json`: Coleção do Postman para testar a API.
- `package.json`: Configurações do projeto e dependências.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **MySQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.
- **Jest**: Framework de testes.
- **Docker**: Containerização da aplicação.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais informações.
