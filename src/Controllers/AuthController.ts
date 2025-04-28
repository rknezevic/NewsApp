import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/User';
import { Message } from '../Utilities/Message';
import * as UserRepository from '../Repository/UserRepository';
import { BadRequestError } from '../ResponseHandle/ErrorHandler';
import { config } from '../config/config'
import { UserRole } from '../Utilities/Enums/UserRole';
import { ResponseConstants } from '../Utilities/Constants/ResponseConstants';
import { okResponse } from '../ResponseHandle/SuccessHandler';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, alias, role } = req.body;

  try {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestError(Message.AUTH.EMAIL_EXISTS);
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

    if (savedUser && savedUser._id) {
      okResponse(res, savedUser);
    } else {
      throw new BadRequestError(Message.USER.REG_FAILED)
    }

  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name }, //* */
      config.jwtSecret,
      { expiresIn: '2h' }
    );
    res.status(ResponseConstants.HttpStatusCodes.OK).json({"token": token});
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
