import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config/config';

export const signToken = async (user: JwtPayload) => {
    return jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      config.jwtSecret,
      { expiresIn: '2h' }
    );
  }