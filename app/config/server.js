import express, { json } from 'express';
import cors from 'cors';

import authRoutes from '../routes/authRoutes.js';
import usersRoutes from '../routes/usersRoutes.js';
import creditsRoutes from '../routes/creditsRoutes.js';
import debitsRoutes from '../routes/debitsRoutes.js';
import categoriesRoutes from '../routes/categoriesRoutes.js';

const app = express();

app.use(json());
app.use(cors({
    origin: '*', // Substitua pelo domínio do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.options('*', cors());

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/debits', debitsRoutes);
app.use('/credits', creditsRoutes);

export { app };