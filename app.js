const app = require('./app/config/server');
//const express = require('express');


// Rota para servir a página home
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});