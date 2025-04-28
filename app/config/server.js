import express, { json } from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger.js';
import authRoutes from '../routes/authRoutes.js';
import usersRoutes from '../routes/usersRoutes.js';
import creditsRoutes from '../routes/creditsRoutes.js';
import debitsRoutes from '../routes/debitsRoutes.js';
import categoriesRoutes from '../routes/categoriesRoutes.js';

const app = express();

app.use(json());
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.options('*', cors());

// Configura o Swagger
setupSwagger(app);

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/debits', debitsRoutes);
app.use('/credits', creditsRoutes);

export { app };