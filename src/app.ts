import express, { Application } from 'express';
import connectDb from './DatabaseLogic/dbConfig';
import {config} from './config/config';
import { errorHandler } from './middleware/errorHandler';
import router from './Routes/router';
import fetchAndSaveNewsJob from './jobs/cronJobs';

const app: Application = express();
app.use(express.json());
app.use(router);
fetchAndSaveNewsJob;
app.use(errorHandler)
connectDb();

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
