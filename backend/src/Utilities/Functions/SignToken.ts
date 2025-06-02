import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';

export const signToken = (user: JwtPayload) => {
    return jwt.sign(
      { id: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: '2h' }
    );
  }