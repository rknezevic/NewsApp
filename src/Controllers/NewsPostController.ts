import { Request, Response } from 'express';
import NewsPost from '../Model/NewsPost';
import { Message } from '../Utilities/Message';
import { BadRequestError } from '../ResponseHandle/BadRequestError'
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { BreakingNewsExpirationTime } from '../Types/BreakingNewsExpiration';
import * as NewsPostRepository from '../Repository/NewsPostRepository'

export const DeleteNewsPost = async (req: Request<{id: string}>, res: Response): Promise<void> => {
  const {id} = req.params;

  try {
    const deleteNews = await NewsPostRepository.deleteNewsPost(id);
    if (!deleteNews) {
      throw new BadRequestError(Message.NEWS.FAIL);
    }

    res.status(200).json({ message: Message.NEWS.SUCCESS })

  } catch (error) {
    throw new BadRequestError(Message.NEWS.FAIL);
  }
}

export const CreateNewsPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
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
    console.log(savedNewsPost);
    if(!savedNewsPost) throw new BadRequestError(Message.NEWS.CREATION_FAILED);

    res.status(201).json({ message: Message.NEWS.CREATED, newsPost });
  } catch (err) {
    console.error('Error saving news post:', err);
    throw new BadRequestError(Message.NEWS.CREATION_FAILED)
  }
};
