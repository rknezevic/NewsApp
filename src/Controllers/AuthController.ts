import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/User';
import { IRegisterBody } from '../Types/IRegisterBody';
import { ILoginBody } from '../Types/ILoginBody';
import { Message } from '../Utilities/Message';
import * as UserRepository from '../Repository/UserRepository';
import process from 'process';
import { BadRequestError } from '../ResponseHandle/BadRequestError';
import { AuthorizationError } from '../ResponseHandle/AuthorizationError';

export const register = async (req: Request<{}, {}, IRegisterBody>, res: Response): Promise<void> => {
  const { name, email, password, alias, role } = req.body;

  try {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError(Message.AUTH.EMAIL_EXISTS);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: role || 'guest',
      name,
      email,
      password: hashPassword,
      alias,
    });

    const savedUser = await UserRepository.createUser(newUser);

    if (savedUser && savedUser._id) {
      res.status(201).json({ message: Message.USER.CREATED });
    } else {
      throw new BadRequestError(Message.USER.REG_FAILED)
    }
  } catch (error) {
    console.error(error);
      throw new BadRequestError(Message.USER.REG_FAILED)
  }
};

export const login = async (req: Request<{}, {}, ILoginBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestError(Message.AUTH.LOGIN_FAILED);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestError(Message.AUTH.LOGIN_FAILED)
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.status(200).json({token});
  } catch (error) {
    console.error('Login error:', error);
    throw new BadRequestError(Message.GENERAL.SERVER_ERROR);
  }
};
