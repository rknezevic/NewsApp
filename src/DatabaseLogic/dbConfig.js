const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected with database');
  } catch (err) {
    console.error('Connection error : ', err.message);
    process.exit(1); 
  }
};

module.exports = connectDb;


