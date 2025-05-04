import express, { json } from 'express';
import cors from 'cors';
import { setupSwagger } from './swagger/swagger.js';
import authRoutes from '../auth/authRoutes.js';
import usersRoutes from '../users/usersRoutes.js';
import creditsRoutes from '../credits/creditsRoutes.js';
import debitsRoutes from '../debits/debitsRoutes.js';
import categoriesRoutes from '../categories/categoriesRoutes.js';

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