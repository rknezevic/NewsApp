import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  newsPostId: mongoose.Types.ObjectId;
  author: string;
  comment: string;
  createdAt?: Date;
}

const commentSchema = new Schema<IComment>(
  {
    newsPostId: { type: Schema.Types.ObjectId, ref: 'NewsPost', required: true },
    author: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
