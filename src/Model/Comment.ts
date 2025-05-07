import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment {
  author: string;
  comment: string;
}

export const commentSchema = new mongoose.Schema<IComment>(
  {
    author: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
