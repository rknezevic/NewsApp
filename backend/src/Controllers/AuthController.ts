import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../Model/User';
import { Message } from '../Utilities/Message';
import * as UserRepository from '../Repository/UserRepository';
import { BadRequestError, ConflictError } from '../ResponseHandle/ErrorHandler';
import { UserRole } from '../Utilities/Enums/UserRole';
import { ResponseConstants } from '../Utilities/Constants/ResponseConstants';
import { okResponse } from '../ResponseHandle/SuccessHandler';
import { signToken } from '../Utilities/Functions/SignToken';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { name, email, password, alias, role } = req.body;

  try {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictError(Message.AUTH.EMAIL_EXISTS);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: role || UserRole.Guest,
      name,
      email,
      password: hashPassword,
      alias,
    });

    const savedUser = await UserRepository.createUser(newUser);

    if (!savedUser) {
      throw new BadRequestError(Message.USER.REG_FAILED)
    }

    return okResponse(res, savedUser);

  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestError(Message.AUTH.LOGIN_FAILED);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user) {
      throw new BadRequestError(Message.AUTH.LOGIN_FAILED)
    }
    const token = signToken(user);
    return okResponse(res, {token});
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

