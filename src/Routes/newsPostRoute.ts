import express from 'express';
import { authMiddleware, permissionCheck } from '../BusinessLogic/authMiddleware';
import { CreateNewsPost, DeleteNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';
import { UserRole } from '../Utilities/Enums/UserRole';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck(UserRole.Admin, UserRole.Editor), CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck(UserRole.Admin), DeleteNewsPost);
router.put('/update/:id', authMiddleware, permissionCheck(UserRole.Editor), UpdateNewsPost )
export default router;
