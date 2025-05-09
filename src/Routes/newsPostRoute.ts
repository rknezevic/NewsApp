import express from 'express';
import { authMiddleware, permissionCheck } from '../middleware/authMiddleware';
import { CreateNewsPost, DeleteNewsPost, GetNewsPostForFrontPage, GetSingleNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';
import { UserRole } from '../Utilities/Enums/UserRole';
import { NewsPostValidator } from '../Validator/NewsPostValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck(UserRole.Admin, UserRole.Editor), NewsPostValidator.createNewsPost, validationMiddleware, CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck(UserRole.Admin), DeleteNewsPost);
router.patch('/update/:id', authMiddleware, permissionCheck(UserRole.Editor, UserRole.Admin), NewsPostValidator.updateNewsPost, validationMiddleware, UpdateNewsPost )
router.get('/:id' , authMiddleware, GetSingleNewsPost);
router.get('/front-page/display', authMiddleware, GetNewsPostForFrontPage);

export default router;
