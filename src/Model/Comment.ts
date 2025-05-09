import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  _id: string;
  author: string;
  comment: string;
  userId: string;
}

export const commentSchema = new mongoose.Schema<IComment>(
  {
    author: { type: String, required: true },
    comment: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
