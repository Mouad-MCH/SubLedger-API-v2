
import express from 'express';
import morgan from 'morgan';
const app = express();
app.set('query parser', 'extended');

import userRoutes from './routes/userRoutes.js';
import subscriptionRoute from './routes/subscriptionRoutes.js';
import transactionRoutes from "./routes/transaction.Routes.js";

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api', subscriptionRoute);
app.use('/api/v1', transactionRoutes);

export default app;