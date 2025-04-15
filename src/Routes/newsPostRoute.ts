import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { CreateNewsPost, DeleteNewsPost } from '../Controllers/NewsPostController';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck('admin', 'editor'), CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck('admin'), DeleteNewsPost);
export default router;
