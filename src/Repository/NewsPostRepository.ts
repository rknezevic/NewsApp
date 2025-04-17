import { ObjectId } from "mongoose";
import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { BadRequestError } from "../ResponseHandle/BadRequestError";
import { ICategory } from "../Utilities/Enums/ICategory";
import { Message } from "../Utilities/Message";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";

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
    if(!updateNewsPost) throw new BadRequestError(Message.NEWS.FAIL);
    return updatedPost;
    }catch{
        throw new BadRequestError(Message.GENERAL.SERVER_ERROR);
    }
}
export const createNewsPost = async (newsData : INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}
