import NewsPost from "../Model/NewsPost";
import { ICommentInput } from "../Types/ICommentInput";

export const addComment = async (postId: string, newComment: ICommentInput) => {
    await NewsPost.findByIdAndUpdate(postId, {
        $push: { comment: newComment },
    });
    return newComment;
}

export const getComments = async (postId: string) => {
    const newsPost = await NewsPost.findById(postId);
    const comments = newsPost?.comment;
    return comments;
}


export const deleteComment = async (postId: string, id: string) => {
    const newsPost = await NewsPost.findByIdAndUpdate(postId, {
        $pull: { comment: { _id: id } },
    });
    return newsPost;
}
