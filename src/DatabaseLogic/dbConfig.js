const mongoose = require('mongoose');
const messages = require('../Utilities/Message');


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(messages.DB.CONNECTED);
  } catch (err) {
    console.error(messages.DB.CONNECTION_ERROR);
    process.exit(1); 
  }
};

module.exports = connectDb;


