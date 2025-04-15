import mongoose from 'mongoose';
import { Message } from '../Utilities/Message';

const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log(Message.DB.CONNECTED);
  } catch (err) {
    console.error(Message.DB.CONNECTION_ERROR);
    process.exit(1);
  }
};

export default connectDb;
