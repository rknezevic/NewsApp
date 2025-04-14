import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../Model/User';
import { IUser } from '../Types/IUser';
import { IRegisterBody } from '../Types/IRegisterBody';
import { ILoginBody } from '../Types/ILoginBody';
import { Message } from '../Utilities/Message';
import process from 'process';

export const register = async (req: Request<{}, {}, IRegisterBody>, res: Response): Promise<void> => {
  const { name, email, password, alias, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: Message.AUTH.EMAIL_EXISTS });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role: role || 'guest',
      name,
      email,
      password: hashPassword,
      alias,
    });

    await newUser.save();

    res.status(201).json({ message: Message.USER.CREATED });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: Message.USER.REG_FAILED });
  }
};

export const login = async (req: Request<{}, {}, ILoginBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: Message.AUTH.LOGIN_FAILED });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: Message.AUTH.LOGIN_FAILED });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: Message.USER.LOGGED_IN,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: Message.AUTH.LOGIN_FAILED });
  }
};
