
import express from 'express';
import morgan from 'morgan';
const app = express();
app.set('query parser', 'extended');

import userRoutes from './routes/userRoutes.js';
import subscriptionRoute from './routes/subscriptionRoutes.js';

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api', subscriptionRoute);

export default app;