import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import secret from '../../secret.json';

export const authenticateJWT = (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret.secret, (err, username) => {
      if (err) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
      req.customData = username;
      next();
    });
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
