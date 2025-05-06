import { Types } from "mongoose";
import { IComment } from "../Model/Comment";

export interface ICommentInputData extends IComment {
    _id?: Types.ObjectId; 
}