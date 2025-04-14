import { Document } from "mongoose";

export interface IUser extends Document {
    role: 'admin' | 'editor' | 'guest';
    name: string;
    email: string;
    password: string;
    alias: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  