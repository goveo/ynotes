import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../app.config';

export default (req: Request, res: Response, next: NextFunction): any => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(400).json({
      message: 'No token, authorize denied',
    });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = (decodedToken as any).user;
    next();
  }
  catch (error) {
    res.status(400).json({
      message: 'Token is not valid',
    });
  }
};
