import { IComment } from "../Model/Comment";
import NewsPost from "../Model/NewsPost";
import { NotFoundError } from "../ResponseHandle/ErrorHandler";
import { Message } from "../Utilities/Message";

export const addComment = async (postId: string, newComment: IComment) => {
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


// mogu li isValidComment i deleteComment u istu funkciju

export const isValidComment = async (postId: string, id: string) => {
    const newsPost = await NewsPost.findById(postId);
    const comment = newsPost?.comment?.find((comment: IComment) => comment._id?.toString() === id);
    console.log(comment);
    if (!comment) {
        throw new NotFoundError(Message.NEWS.COMMENT_NOT_FOUND);
    }
    return await NewsPost.find({ "comment._id": id });
}

export const deleteComment = async (postId: string, id: string) => {
    const newsPost = await NewsPost.findByIdAndUpdate(postId, {
        $pull: { comment: { _id: id } },
    });
    return newsPost;
}
