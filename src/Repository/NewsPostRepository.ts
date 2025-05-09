import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { Message } from "../Utilities/Message";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";
import { NotFoundError, InternalError, BadRequestError } from "../ResponseHandle/ErrorHandler";
import { INewsPostFrontPage } from "../Types/INewsPostFrontPage";
import { NewsCategory } from "../Utilities/Enums/NewsCategory";
import { mongoErrorHandler } from "../middleware/mongoErrorHandler";
import * as UserRepository from "./UserRepository";


export const deleteNewsPost = async (id: string) => {
    const newsPost = await NewsPost.findByIdAndDelete(id);
    return newsPost;
}

export const getActiveBreakingNews = async () => {
    return await NewsPost.findOne({
        isBreaking: true,
        breakingExpiresAt: { $gt: new Date() }, //provjera ima li aktivnih breaking news-a u zadnja 2 dana
    });

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
  
      return {
        category,
        posts,
      };
    });
    const newsPosts = await Promise.all(newsByCategoryPromises);

    const breakingNews = await getActiveBreakingNews();
    
    const mappedNewsPosts = await Promise.all(newsPosts.map(async (item: any) => {
        const postsWithUserName = await Promise.all(item.posts.map(async (post: INewsPostFrontPage) => {
            const user = await UserRepository.findUserById(post.createdBy);
            return {
                _id: post._id,
                headline: post.headline,
                shortDescription: post.shortDescription,
                image: post.image,
                category: post.category,
                createdBy: user?.name,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        }));
        return {
            category: item.category,
            posts: postsWithUserName,
        };
    }));
    //transformacija mapiranih vrijesti u jedan objekt s kategorijama kao kljucevima i postovima kao vrijednostima
    const result = mappedNewsPosts.reduce((acc, curr, index) => {
        const category = categories[index]; 
        acc[category] = curr.posts;
        return acc;
      }, {} as Record<NewsCategory, typeof mappedNewsPosts[number]["posts"]>);
    return {
      ...result,
      breakingNews,
    };
    }
    catch (error) {
        throw mongoErrorHandler(error);
    }
};