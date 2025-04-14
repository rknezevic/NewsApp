import { Request, Response } from 'express';
import NewsPost from '../Model/NewsPost';
import { Message } from '../Utilities/Message';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { AuthenticatedRequest } from '../Types/AuthenticatedRequest';
import { INewsPost } from '../Types/INewsPost'; 

export const createNewsPost = async (
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
      const activeBreakingNews = await NewsPost.findOne({
        isBreaking: true,
        breakingCreatedAt: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
      });

      if (activeBreakingNews) {
        res.status(400).json({ error: Message.NEWS.BREAKING_EXISTS });
        return;
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
        ? new Date(Date.now() + 48 * 60 * 60 * 1000)
        : null,
      createdBy: req.user?.id,
      lastEditedBy: req.user?.id,
    });

    await newsPost.save();

    res.status(201).json({ message: Message.NEWS.CREATED, newsPost });
  } catch (err) {
    console.error('Error saving news post:', err);
    res.status(500).json({ error: Message.NEWS.CREATION_FAILED });
  }
};
