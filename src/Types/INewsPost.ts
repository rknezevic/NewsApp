import { Document, Types } from 'mongoose';

export interface INewsPost extends Document {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: 'worldwide' | 'local' | 'sport' | 'economy' | 'entertainment';
  isBreaking: boolean;
  breakingExpiresAt?: Date | null;
  createdBy: Types.ObjectId;
  lastEditedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}