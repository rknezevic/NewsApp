import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";
import { NewsCategory } from "../Utilities/Enums/NewsCategory";
import { mongoErrorHandler } from "../middleware/mongoErrorHandler";
import axios from "axios";
import { config } from "../config/config";
import ExternalNewsPost from "../Model/ExternalNewsPost";

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
        const mappedNewsPosts = await Promise.all(newsPosts.map(async (item: any) => {
            return {
                category: item.category,
                posts: item.posts.map((post: INewsPost) => ({
                    _id: post._id,
                    headline: post.headline,
                    shortDescription: post.shortDescription,
                    image: post.image,
                    category: post.category,
                    createdBy: post.createdBy,
                    createdAt: post.createdAt,
                    updatedAt: post?.updatedAt,
                    lastEditedBy: post?.lastEditedBy,
                })),
            };
        }));

        //transformacija mapiranih vrijesti u jedan objekt s kategorijama kao kljucevima i postovima kao vrijednostima
        const result = mappedNewsPosts.reduce((acc, curr, index) => {
            const category = categories[index];
            acc[category] = curr.posts;
            return acc;
        }, {} as Record<NewsCategory, typeof mappedNewsPosts[number]["posts"]>);

        const breakingNews = activeBreakingNews ? {
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
            ...result,
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
        const articles = response.data.articles;

        const externalNewsPost = articles.map((article: any) => ({
            source: {
                id: article.source.id,
                name: article.source.name,
            },
            headline: article.title,
            author: article.author,
            shortDescription: article.description,
            image: article.urlToImage,
            createdAt: new Date(article.publishedAt),
            fullDescription: article.content,
            lastEditedBy: article.author,
            createdBy: article.author,
        })); 
        const insertedNewsPost = ExternalNewsPost.insertMany(externalNewsPost);
        return insertedNewsPost;
    } catch (error) {
        throw mongoErrorHandler(error);
    }
} 