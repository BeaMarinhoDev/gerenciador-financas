const express = require('express');
//const consign = require('consign');
const usersRoutes = require('../routes/usersRoutes');
const creditsRoutes = require('../routes/creditsRoutes')
const debitsRoutes = require('../routes/debitsRoutes'); 
const categoriesRoutes = require('../routes/categoriesRoutes');
const app = express();

app.use(express.json());
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