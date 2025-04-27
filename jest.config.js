export default {
    testEnvironment: 'node', // Define o ambiente de teste como Node.js
    transform: {
        '^.+\\.js$': 'babel-jest', // Usa o Babel para transformar arquivos .js
    },
};