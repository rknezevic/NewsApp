import { NextFunction, Request, Response } from 'express';
import NewsPost from '../Model/NewsPost';
import { Message } from '../Utilities/Message';
import { BadRequestError } from '../ResponseHandle/BadRequestError'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { BreakingNewsExpirationTime } from '../Utilities/Constants/AppConstants';
import * as NewsPostRepository from '../Repository/NewsPostRepository'
import { okResponse } from '../ResponseHandle/okResponse';
import { IUpdatedFields } from '../Utilities/Enums/IUpdatedFields';

export const DeleteNewsPost = async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
  const {id} = req.params;

  try {
    const deleteNews = await NewsPostRepository.deleteNewsPost(id);
    if (!deleteNews) {
      throw new BadRequestError(Message.NEWS.FAIL);
    }

    okResponse(res, Message.NEWS.SUCCESS);
  } catch (error) {
    return next(error);
  }
}

export const UpdateNewsPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const updateData = req.body;

  const allowedFields = Object.values(IUpdatedFields) as string[];
  const invalidFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));

  if (invalidFields.length > 0) {
    return next(new BadRequestError(`Invalid fields in update: ${invalidFields.join(', ')}`));
  }

  try {
    const newsPost = await NewsPostRepository.getNewsPost(id);

    if (!newsPost) throw new BadRequestError(Message.NEWS.NOT_FOUND);

    const updatedPost = await NewsPostRepository.updateNewsPost(id, updateData);

    if (!updatedPost) throw new BadRequestError(Message.GENERAL.SERVER_ERROR);

    okResponse(res, Message.NEWS.UPDATED, updatedPost);
  } catch (error) {
    return next(error);
  }
};

export const CreateNewsPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const {
    headline,
    shortDescription,
    fullDescription,
    image,
    category,
    isBreaking,
  } = req.body;

  try {
    if (isBreaking) {
      const activeBreakingNews = await NewsPostRepository.getActiveBreakingNews();
      if (activeBreakingNews) {
        throw new BadRequestError(Message.NEWS.BREAKING_EXISTS);
      }
    }

    const newsPost = new NewsPost({
      headline,
      shortDescription,
      fullDescription,
      image,
      category,
      isBreaking,
      breakingExpiresAt: isBreaking
        ? new Date(Date.now() + BreakingNewsExpirationTime) //breaking news traje 2 dana
        : null,
      createdBy: req.user?.id,
      lastEditedBy: req.user?.id,
    });
    
    const savedNewsPost = NewsPostRepository.createNewsPost(newsPost);
    if(!savedNewsPost) throw new BadRequestError(Message.NEWS.CREATION_FAILED);

    okResponse(res, Message.NEWS.CREATED, { newsPost })
  } catch (error) {
    console.error('Error saving news post:', error);
    return next(error);
  }
};
