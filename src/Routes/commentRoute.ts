import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { AddComment, DeleteComment, GetComments } from '../Controllers/CommentController';

import { UserRole } from '../Utilities/Enums/UserRole';
import { validationMiddleware } from '../BusinessLogic/validationMiddleware';
import { commentValidator } from '../Validator/CommentValidator';


const router = express.Router({ mergeParams: true }); // merge params kako bih mogao dohvatiti id news posta iz URL-a

router.get('/get', authMiddleware, GetComments);
router.post('/add', authMiddleware, commentValidator.addComment, validationMiddleware, AddComment);
router.delete('/delete/:commentId', authMiddleware, permissionCheck(UserRole.Admin), DeleteComment);

export default router;