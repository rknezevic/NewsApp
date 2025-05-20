import express from 'express';
import { authMiddleware, permissionCheck } from '../middleware/authMiddleware';
import { CreateNewsPost, DeleteNewsPost, SaveExternalNewsPost, GetNewsPostForFrontPage, GetSingleNewsPost, UpdateNewsPost } from '../Controllers/NewsPostController';
import { UserRole } from '../Utilities/Enums/UserRole';
import { NewsPostValidator } from '../Validator/NewsPostValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';
import cron from 'node-cron';
import { config } from '../config/config';

const router = express.Router();

router.post('/create', authMiddleware, permissionCheck(UserRole.Admin, UserRole.Editor), NewsPostValidator.createNewsPost, validationMiddleware, CreateNewsPost);
router.delete('/delete/:id', authMiddleware, permissionCheck(UserRole.Admin), DeleteNewsPost);
router.patch('/update/:id', authMiddleware, permissionCheck(UserRole.Editor, UserRole.Admin), NewsPostValidator.updateNewsPost, validationMiddleware, UpdateNewsPost )
router.get('/:id' , authMiddleware, GetSingleNewsPost);
router.get('/front-page/display', authMiddleware, GetNewsPostForFrontPage);

cron.schedule(config.cronSchedule, async () => { //cron job to run every 16 hours
    await SaveExternalNewsPost();
  });

export default router;
