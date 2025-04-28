FROM node:slim

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos do projeto
COPY package*.json ./
RUN npm install

COPY . .

# Expõe as portas configuradas no .env
EXPOSE ${HTTP_PORT}

# Comando para iniciar a aplicação
CMD ["npm", "start"]