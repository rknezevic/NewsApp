import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";
import { NewsCategory } from "../Utilities/Enums/NewsCategory";
import { mongoErrorHandler } from "../middleware/mongoErrorHandler";
import axios from "axios";
import { config } from "../config/config";
import ExternalNewsPost, { IExternalNewsPost } from "../Model/ExternalNewsPost";

export const deleteNewsPost = async (id: string) => {
    const newsPost = await NewsPost.findByIdAndDelete(id);
    return newsPost;
}

export const getActiveBreakingNews = async () => {
    return await NewsPost.findOne({
        isBreaking: true,
        breakingExpiresAt: { $gt: new Date() },
        //provjera ima li aktivnih breaking news-a u zadnja 2 dana
    })
        .populate('createdBy', 'name')
        .populate('lastEditedBy', 'name');
}

export const updateNewsPost = async (id: string, updateData: INewsPostUpdate) => {
    return await NewsPost.findByIdAndUpdate(id, updateData, { new: true })
}
export const createNewsPost = async (newsData: INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}

export const incrementPageVisits = async (postId: string) => {
    const newsPost = await NewsPost.findByIdAndUpdate(
        postId,
        { $inc: { views: +1 } },
        { new: true }
    )
    return newsPost;
}

export const getSingleNewsPost = async (id: string, increment?: boolean) => {
    const newsPost = await NewsPost.findById(id);
    if (increment) {
        await incrementPageVisits(id);
    }
    return newsPost;
}
export const getNewsPostForFrontPage = async () => {
    try {
        const categories = Object.values(NewsCategory);

        const newsByCategoryPromises = categories.map(async (category) => {
            const posts = await NewsPost.find({ category, isBreaking: false })
                .sort({ createdAt: -1 })
                .limit(4)
                .populate('createdBy', 'name')
                .populate('lastEditedBy', 'name')

            return {
                category,
                posts,
            };
        });
        const newsPosts = await Promise.all(newsByCategoryPromises);

        const activeBreakingNews = await getActiveBreakingNews();
        const breakingNews = activeBreakingNews ? {//nepotrebno, popraviti
            _id: activeBreakingNews._id,
            headline: activeBreakingNews.headline,
            shortDescription: activeBreakingNews.shortDescription,
            image: activeBreakingNews.image,
            category: activeBreakingNews.category,
            createdBy: activeBreakingNews.createdBy,
            createdAt: activeBreakingNews.createdAt,
            updatedAt: activeBreakingNews?.updatedAt,
            lastEditedBy: activeBreakingNews?.lastEditedBy
        } : null;
        return {
            newsPosts,
            breakingNews,
        };
    }
    catch (error) {
        throw mongoErrorHandler(error);
    }
};

export const fetchAndSaveExternalNewsPosts = async () => {
    try {
        const response = await axios.get(config.apiUrl);
        //axios u controller
        const articles = response.data.articles;

        const externalNewsPost = articles.map((article: IExternalNewsPost) => ({ //u drugi file
            source: {
                id: article.source.id,
                name: article.source.name,
            },
            title: article.title,
            author: article.author,
            description: article.description,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content,
            lastEditedBy: article.author
        }));
        const insertedNewsPost = ExternalNewsPost.insertMany(externalNewsPost);
        return insertedNewsPost;
    } catch (error) {
        throw mongoErrorHandler(error);
    }
} 