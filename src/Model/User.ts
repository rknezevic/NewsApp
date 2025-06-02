import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../Utilities/Enums/UserRole';

export interface IUser extends Document {
    role: 'admin' | 'editor' | 'guest';
    name: string;
    email: string;
    password: string;
    alias: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: UserRole,
      default: 'guest'
    },
    name: {
      type: String,
      required: function (this: IUser) {
        return this.role === 'admin' || this.role === 'editor';
      }
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
