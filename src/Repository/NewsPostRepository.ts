import NewsPost from "../Model/NewsPost";
import { BreakingNewsExpirationTime } from "../Types/BreakingNewsExpiration";
import { INewsPost } from "../Model/NewsPost";

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

export const createNewsPost = async (newsData : INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}