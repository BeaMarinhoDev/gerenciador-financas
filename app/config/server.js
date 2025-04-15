const express = require('express');
//const consign = require('consign');

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