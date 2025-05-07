import mongoose, { Types } from "mongoose";
import { IComment } from "../Model/Comment";

export interface ICommentInput extends IComment, Document {
    _id?: Types.ObjectId; 
}

const CommentInputDataSchema = new mongoose.Schema<ICommentInput>({
    author: { type: String, required: true },
    comment: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false }
});
export const CommentInput = mongoose.model<ICommentInput>("CommentInput", CommentInputDataSchema);