import NewsPost from "../Model/NewsPost";
import { BreakingNewsExpirationTime } from "../Types/BreakingNewsExpiration";
import { INewsPost } from "../Types/INewsPost";

export const deleteNewsPost = async (id : string) =>{
    const newsPost = await NewsPost.findByIdAndDelete(id);
    return newsPost;
}

export const getActiveBreakingNews = async () => {
    const activeBN = await NewsPost.findOne({
        isBreaking: true,
        breakingCreatedAt: { $gte: new Date(Date.now() - BreakingNewsExpirationTime) }, //provjera ima li aktivnih breaking news-a u zadnja 2 dana
      });
    return activeBN; 
}

export const createNewsPost = async (newsData : INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}