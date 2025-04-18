const express = require('express');
const cors = require('cors');

const authRoutes = require('../routes/authRoutes');
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

app.use('/auth', authRoutes)
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/debits', debitsRoutes);
app.use('/credits', creditsRoutes);

module.exports = app;