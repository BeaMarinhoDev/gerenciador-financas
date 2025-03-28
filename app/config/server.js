const express = require('express');
//const consign = require('consign');
const usersRoutes = require('../routes/usersRoutes');
const categoriesRoutes = require('../routes/categoriesRoutes');
const app = express();

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);

// consign()
//     .include('app/routes')
//     //.then('config/db/db.js')
//     .then('app/models')
//     .then('app/controllers')
//     .into(app);

module.exports = app;