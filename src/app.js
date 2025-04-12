const express = require('express');
const connectDb = require('./DatabaseLogic/dbConfig');
require('dotenv').config();
const authRoutes = require('./Routes/auth');

const app = express()
app.use(express.json());

app.use('/api/auth', authRoutes);

connectDb();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });


