import mongoose, { ObjectId } from "mongoose";
import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { BadRequestError } from "../ResponseHandle/BadRequestError";
import { Message } from "../Utilities/Message";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";
import { InternalError } from "../ResponseHandle/InternalError";
import { NotFoundError } from "../ResponseHandle/NotFoundError";
import { Comment } from "../Model/Comment";

export const deleteNewsPost = async (id : string) =>{
    const newsPost = await NewsPost.findByIdAndDelete(id);
    return newsPost;
}

export const getActiveBreakingNews = async () => {
    return await NewsPost.findOne({
        isBreaking: true,
        breakingExpiresAt: { $gt: new Date() }, //provjera ima li aktivnih breaking news-a u zadnja 2 dana
      });
    
}

export const getNewsPost = async (id: string) => {
    return await NewsPost.findById(id);
}

export const updateNewsPost = async (id: string, updateData: INewsPostUpdate) => {
    try{
    const updatedPost = await NewsPost.findByIdAndUpdate(id, updateData, {new: true})
    if(!updateNewsPost) throw new InternalError(Message.NEWS.FAIL);
    return updatedPost;
    }catch{
        throw new BadRequestError(Message.GENERAL.SERVER_ERROR);
    }
}
export const createNewsPost = async (newsData : INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}

export const incrementPageVisits = async (postId: string) => {
    const newsPost = await NewsPost.findByIdAndUpdate(
        new mongoose.Types.ObjectId(postId),
        { $inc: { views: 1 }},
        { new: true }
    )
    if (!newsPost) {
        throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    return newsPost;
}

export const getSingleNewsPost = async (id: string) => {
    const newsPost = await NewsPost.findById(new mongoose.Types.ObjectId(id)).lean();

    incrementPageVisits(id);

    if (!newsPost) {
        throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    return newsPost;
}

export const addComment = async (postId: string, author: string, comment: string) => {
    const newComment = new Comment({newsPostId: new mongoose.Types.ObjectId(postId), author, comment });
    return await newComment.save();
}
export const getComments = async (postId: string) => {
    return await Comment.find({ newsPostId: new mongoose.Types.ObjectId(postId) });
}
export const deleteComment = async (id: string) => {
    const comment = await Comment.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (!comment) {
        throw new NotFoundError(Message.NEWS.COMMENT_NOT_FOUND);
    }
    return comment;
}