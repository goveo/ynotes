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
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const user = decodedToken.user;
    if (!user || !user.id) throw new Error('Token is not valid');
    req.user = decodedToken.user;
    next();
  }
  catch (error) {
    res.status(400).json({
      message: 'Token is not valid',
    });
  }
};
