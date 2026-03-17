import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes.js';
import subscriptionRoute from './routes/subscriptionRoutes.js';

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api', subscriptionRoute);

export default app;