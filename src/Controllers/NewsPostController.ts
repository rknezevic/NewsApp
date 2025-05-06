import { NextFunction, Request, Response } from 'express';
import NewsPost from '../Model/NewsPost';
import { Message } from '../Utilities/Message';
import { BadRequestError, ForbiddenError, NotFoundError } from '../ResponseHandle/ErrorHandler'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { BreakingNewsExpirationTime, allowedFields } from '../Utilities/Constants/AppConstants';
import * as NewsPostRepository from '../Repository/NewsPostRepository'
import { okResponse } from '../ResponseHandle/SuccessHandler';
import { INewsPostUpdate } from '../Types/INewsPostUpdate';

export const DeleteNewsPost = async (req: Request<{ id: string }>, res: Response, next: NextFunction):Promise<any> => {
  const { id } = req.params;

  try {
    const deleteNews = await NewsPostRepository.deleteNewsPost(id);
    if (!deleteNews) {
      throw new NotFoundError(Message.NEWS.NOT_FOUND);
    }
    return okResponse(res, Message.NEWS.SUCCESS);
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export const UpdateNewsPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  const { id } = req.params;
  const { headline, shortDescription, fullDescription, image, category } = req.body;
  
  try {
    const updateData: INewsPostUpdate = {
      headline,
      shortDescription,
      fullDescription,
      image,
      category,
      lastEditedBy: req.user?.id,
      updatedAt: new Date(),
    };
    const newsPost = await NewsPostRepository.getSingleNewsPost(id);
    if (!newsPost) throw new NotFoundError(Message.NEWS.NOT_FOUND);

    const updatedPost = await NewsPostRepository.updateNewsPost(id, updateData);
    if (!updatedPost) throw new BadRequestError(Message.GENERAL.SERVER_ERROR);

    return okResponse(res, updatedPost);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const GetSingleNewsPost = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
  const { id } = req.params;

  try {
    const newsPost = await NewsPostRepository.getSingleNewsPost(id, true);

    if (!newsPost) throw new NotFoundError(Message.NEWS.NOT_FOUND);

    return okResponse(res, newsPost);
  } catch (error) {
    return next(error);
  }
};

export const CreateNewsPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<any> => {
  const { headline, shortDescription, fullDescription, image, category } = req.body;
  let isBreaking = req.body.isBreaking;
  try {
    //novi postaje breaking, stara vijest se brise -----
    if (isBreaking) {
      const activeBreakingNews = await NewsPostRepository.getActiveBreakingNews();
      if (activeBreakingNews) {
        activeBreakingNews.isBreaking = false;
        activeBreakingNews.breakingExpiresAt = null; 
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

    const savedNewsPost = await NewsPostRepository.createNewsPost(newsPost);
    if (!savedNewsPost) throw new BadRequestError(Message.NEWS.CREATION_FAILED);

    return okResponse(res,newsPost)
  } catch (error) {
    console.error('Error saving news post:', error);
    return next(error);
  }
};

export const GetNewsPostForFrontPage = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  try {
    const newsPosts = await NewsPostRepository.getNewsPostForFrontPage();
    if (!newsPosts) throw new NotFoundError(Message.NEWS.NOT_FOUND);
    console.log(newsPosts);

    return okResponse(res, newsPosts);
  } catch (error) {
    return next(error);
  }
}
