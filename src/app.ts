import express, { Application } from 'express';
import connectDb from './DatabaseLogic/dbConfig';
import dotenv from 'dotenv';

import authRoutes from './Routes/auth';
import newsPostRoute from './Routes/newsPostRoute';
dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/news-post', newsPostRoute);

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
