const express = require('express');
//const consign = require('consign');
const usersRoutes = require('../routes/usersRoutes');
const debitsRoutes = require('../routes/debitsRoutes'); // Importe debitsRoutes
const categoriesRoutes = require('../routes/categoriesRoutes');
const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/debits', debitsRoutes);

// consign()
//     .include('app/routes')
//     //.then('config/db/db.js')
//     .then('app/models')
//     .then('app/controllers')
//     .into(app);

module.exports = app;