import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import secret from '../../secret.json';

export const hashPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  bcrypt.hash(req.body.password, secret.round).then((hash) => {
    req.body = { ...req.body, password: hash };
    return next();
  });
};
