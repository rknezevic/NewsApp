import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { CreateNewsPost, DeleteNewsPost, GetSingleNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';
import { UserRole } from '../Utilities/Enums/UserRole';
import { NewsPostValidator } from '../Validator/NewsPostValidator';
import { validationMiddleware } from '../BusinessLogic/validationMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck(UserRole.Admin, UserRole.Editor), NewsPostValidator.createNewsPost, validationMiddleware, CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck(UserRole.Admin), DeleteNewsPost);
router.patch('/update/:id', authMiddleware, permissionCheck(UserRole.Editor, UserRole.Admin), NewsPostValidator.updateNewsPost, validationMiddleware, UpdateNewsPost )
router.get('/:id' , authMiddleware, GetSingleNewsPost);

export default router;
