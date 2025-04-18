import mongoose, { Document, Schema, Types } from 'mongoose';
import { ICategory } from '../Utilities/Enums/NewsCategory';

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

const newsPostSchema: Schema<INewsPost> = new Schema(
  {
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ICategory,
      required: true,
    },
    isBreaking: {
      type: Boolean,
      default: false,
    },
    breakingExpiresAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastEditedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const NewsPost = mongoose.model<INewsPost>('NewsPost', newsPostSchema);
export default NewsPost;
