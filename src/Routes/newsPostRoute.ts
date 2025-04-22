import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { AddComment, CreateNewsPost, DeleteComment, DeleteNewsPost, GetComments, GetSingleNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';
import { UserRole } from '../Utilities/Enums/UserRole';
import e from 'express';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck(UserRole.Admin, UserRole.Editor), CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck(UserRole.Admin), DeleteNewsPost);
router.put('/update/:id', authMiddleware, permissionCheck(UserRole.Editor), UpdateNewsPost )
router.get('/:id' , authMiddleware, GetSingleNewsPost);
router.get('/:id/comments', authMiddleware, GetComments);
router.post('/:id/comments/add', authMiddleware, AddComment);
router.delete('/comments/delete/:commentId', authMiddleware, permissionCheck(UserRole.Admin), DeleteComment);
router.get('/:id', authMiddleware, GetSingleNewsPost);
export default router;
