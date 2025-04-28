import express from 'express';
import { register, login } from '../Controllers/AuthController';
import { UserValidator } from '../Validator/UserValidator';
import { validationMiddleware } from '../BusinessLogic/validationMiddleware';

const router = express.Router();

router.post('/register', UserValidator.register, validationMiddleware, register);
router.post('/login', UserValidator.login, validationMiddleware,login);

export default router;
