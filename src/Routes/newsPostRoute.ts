import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { createNewsPost } from '../Controllers/NewsPostController';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck('admin', 'editor'), createNewsPost);

export default router;
