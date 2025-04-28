import mongoose, { Document, Schema, Types } from 'mongoose';
import { NewsCategory } from '../Utilities/Enums/NewsCategory';
import { IComment, Comment } from './Comment';

export interface INewsPost extends Document {
  headline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: NewsCategory;
  isBreaking: boolean;
  breakingExpiresAt?: Date | null;
  createdBy: Types.ObjectId;
  lastEditedBy?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  views: number;
  comment?: IComment[];
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
      enum: NewsCategory,
      required: true,
    },
    isBreaking: {
      type: Boolean,
      default: false,
    },
    breakingExpiresAt: {
      type: Date,
      default: null,
      expires: 60 * 60 * 48, // 2 days
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
    views: {
      type: Number,
      default: 0,
      immutable: true,
    },
    comment: [Comment],
  },
  {
    timestamps: true,
  }
);


const NewsPost = mongoose.model<INewsPost>('NewsPost', newsPostSchema);
export default NewsPost;
