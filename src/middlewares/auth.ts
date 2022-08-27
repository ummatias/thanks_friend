import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'Access Denied!' });
  const token = authHeader.split(' ')[1];
  try {
    await jwt.verify(token, process.env.JWT_SECRET || '');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token not valid!' });
  }
};
