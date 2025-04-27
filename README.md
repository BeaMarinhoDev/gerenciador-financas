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

## Instalação

1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd GerenciadorDeFinancas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```
     DB_HOST=<host_do_banco>
     DB_USER=<usuario_do_banco>
     DB_PASSWORD=<senha_do_banco>
     DB_NAME=<nome_do_banco>
     JWT_SECRET=<chave_secreta>
     ```

4. Configure o banco de dados:
   - Execute o script SQL localizado em `helpers/estrutura.sql` para criar as tabelas necessárias.

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

## Estrutura do Projeto

- `app.js`: Arquivo principal da aplicação.
- `helpers/estrutura.sql`: Script SQL para configuração do banco de dados.
- `helpers/gerenciador_financas API.postman_collection.json`: Coleção do Postman para testar a API.
- `package.json`: Configurações do projeto e dependências.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **MySQL**: Banco de dados relacional.
- **JWT**: Autenticação baseada em tokens.
- **Jest**: Framework de testes.

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
