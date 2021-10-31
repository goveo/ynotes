import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../app.config';

type TokenUser = { user: { id: number }};

export default (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(400).json({
      message: 'No token, authorize denied',
    });
  }
  else {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET) as TokenUser;
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
  }
};
