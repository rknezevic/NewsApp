import express from 'express';
import { register, login, logout } from '../Controllers/AuthController';
import { UserValidator } from '../Validator/UserValidator';
import { validationMiddleware } from '../middleware/validationMiddleware';

const router = express.Router();

router.post('/register', UserValidator.register, validationMiddleware, register);
router.post('/login', UserValidator.login, validationMiddleware,login);
router.post('/logout', logout);
export default router;
