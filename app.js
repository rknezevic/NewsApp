const express = require('express');
const connectDb = require('./src/DatabaseLogic/dbConfig');

const authRoutes = require('./src/Routes/auth');
const newsPostRoute = require('./src/Routes/newsPostRoute');

const app = express()
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/news-post', newsPostRoute);
connectDb();


  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });


