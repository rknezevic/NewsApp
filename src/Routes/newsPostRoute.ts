import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { CreateNewsPost, DeleteNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck('admin', 'editor'), CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck('admin'), DeleteNewsPost);
router.put('/update/:id', authMiddleware, permissionCheck('editor'), UpdateNewsPost )
export default router;
