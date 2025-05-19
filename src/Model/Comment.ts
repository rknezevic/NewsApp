import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  _id: string;
  userId: Types.ObjectId;
  comment: string;
}

export const commentSchema = new mongoose.Schema<IComment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
export const Comment = mongoose.model<IComment>('Comment', commentSchema);
