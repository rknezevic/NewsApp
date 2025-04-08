const express = require('express');
const { connectDb, getDb } = require('./DatabaseLogic/dbConfig');
const app = express()
require('dotenv').config();

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  });