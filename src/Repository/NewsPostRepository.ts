import NewsPost from "../Model/NewsPost";
import { INewsPost } from "../Model/NewsPost";
import { Message } from "../Utilities/Message";
import { INewsPostUpdate } from "../Types/INewsPostUpdate";
import { NotFoundError, InternalError, BadRequestError  } from "../ResponseHandle/ErrorHandler";


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

// funkcija se koristi samo za dohvacanje news posta putem id-a, koristi se samo na backendu
export const getNewsPost = async (id: string) => {
    return await NewsPost.findById(id);
}

export const updateNewsPost = async (id: string, updateData: INewsPostUpdate) => {
    try {
        const updatedPost = await NewsPost.findByIdAndUpdate(id, updateData, { new: true })
        if (!updateNewsPost) throw new InternalError(Message.NEWS.FAIL);
        return updatedPost;
    } catch {
        throw new BadRequestError(Message.GENERAL.SERVER_ERROR);
    }
}
export const createNewsPost = async (newsData: INewsPost) => {
    const newsPost = new NewsPost(newsData);
    return await newsPost.save();
}

export const incrementPageVisits = async (postId: string) => {
    const newsPost = await NewsPost.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } },
        { new: true }
    )
    if (!newsPost) {
        throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    return newsPost;
}

// ova funkcija ce se koristiti kada zelimo prikazati post te povecati broj posjeta
export const getSingleNewsPostForViews = async (id: string) => {
    const newsPost = await NewsPost.findById(id);

    incrementPageVisits(id);

    if (!newsPost) {
        throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    return newsPost;
}
