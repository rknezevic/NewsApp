import { AuthenticatedRequest } from "../Types/AuthenticatedRequest";
import * as CommentRepository from "../Repository/CommentRepository";
import * as NewsPostRepository from "../Repository/NewsPostRepository";
import { BadRequestError, NotFoundError } from "../ResponseHandle/ErrorHandler";
import { Message } from "../Utilities/Message";
import { okResponse } from "../ResponseHandle/SuccessHandler";
import { Response, NextFunction } from "express";
import { UserRole } from "../Utilities/Enums/UserRole";
import NewsPost from "../Model/NewsPost";
import { Comment } from "../Model/Comment";

export const GetComments = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  const { newsPostId } = req.params;
  try {
    const newsPost = await NewsPost.findOne({ _id: newsPostId });
    if (!newsPost) {
      throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    const comments = await CommentRepository.getComments(newsPostId);
    if (!comments) {
      throw new NotFoundError(Message.NEWS.COMMENT_NOT_FOUND);
    }
    return okResponse(res, comments);
  } catch (err) {
    throw new BadRequestError(Message.GENERAL.SERVER_ERROR);//
  }
};

export const DeleteComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  const { newsPostId, commentId } = req.params;
  try {
    const newsPost = await NewsPost.findById(newsPostId);
    if (!newsPost) {
      throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    const comment = await CommentRepository.deleteComment(newsPostId, commentId);
    if (!comment) {
      throw new NotFoundError(Message.NEWS.COMMENT_NOT_FOUND);
    }
    return okResponse(res, Message.NEWS.COMMENT_DELETED);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const AddComment = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => { 
    const { newsPostId } = req.params;
    const user = req.user;

  try {
    const newsPost = await NewsPostRepository.getSingleNewsPost(newsPostId);
    if (!newsPost) {
      throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    const newComment = await Comment.create({
        userId : user?._id,
        comment : req.body.comment,
    });
    if (!newComment) {
        return next(new BadRequestError(Message.NEWS.COMMENT_FAILED));
    }

    const response = await CommentRepository.addComment(newsPostId, newComment);
    if (!response) {
      return next(new BadRequestError(Message.NEWS.COMMENT_FAILED));
    }
    return okResponse(res, response);
  } catch (err) {
    return next(err);
  }
};
