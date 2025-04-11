const express = require('express');
//const consign = require('consign');
const session = require('express-session');
const cors = require('cors');
//const path = require('path');
const usersRoutes = require('../routes/usersRoutes');
const creditsRoutes = require('../routes/creditsRoutes')
const debitsRoutes = require('../routes/debitsRoutes'); 
const categoriesRoutes = require('../routes/categoriesRoutes');

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*', // Substitua pelo domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.options('*', cors()) 

app.use(session({
    secret: 'JWT_SECRET', // Chave secreta para assinar o cookie de sessão (mantenha segura!)
    resave: false, // Não salva a sessão novamente se nada mudou
    saveUninitialized: true, // Salva sessões novas, mas não modificadas
    cookie: {
        secure: false, // Defina como true em produção se estiver usando HTTPS
        httpOnly: true, // Impede que JavaScript do lado do cliente acesse o cookie
        maxAge: 3600000 // Tempo de vida do cookie em milissegundos (ex: 1 hora)
    }

}));

app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/debits', debitsRoutes);
app.use('/credits', creditsRoutes);



// consign()
//     .include('app/routes')
//     //.then('config/db/db.js')
//     .then('app/models')
//     .then('app/controllers')
//     .into(app);

module.exports = app;