import express, { Application } from 'express';
import connectDb from './DatabaseLogic/dbConfig';
import {config} from './config/config';
import { errorHandler } from './BusinessLogic/errorHandler';
import router from './Routes/router';

const app: Application = express();
app.use(express.json());

app.use(router);

app.use(errorHandler)
connectDb();

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
