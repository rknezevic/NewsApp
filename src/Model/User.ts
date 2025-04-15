import mongoose, { Schema } from 'mongoose';
import { IUser } from '../Types/IUser';
import { IUserRole } from '../Types/IUserRole';

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: IUserRole,
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
