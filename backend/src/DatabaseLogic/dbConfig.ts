import mongoose from 'mongoose';
import { Message } from '../Utilities/Message';
import { config } from '../config/config';

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log(Message.DB.CONNECTED);
  } catch (err) {
    console.error(Message.DB.CONNECTION_ERROR);
    process.exit(1);
  }
};

export default connectDb;
