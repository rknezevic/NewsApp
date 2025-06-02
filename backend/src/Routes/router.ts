import { application, Router } from 'express';
import authRoutes from './auth';
import newsPostRoute from './newsPostRoute';
import express, { Application } from 'express';
import commentRoute from './commentRoute';

const router = Router();

router.use('/api/auth', authRoutes);
router.use('/api/news-post', newsPostRoute); 
router.use('/api/:newsPostId/comments', commentRoute); 

export default router;