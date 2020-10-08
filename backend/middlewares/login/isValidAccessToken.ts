import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import secret from '../../secret.json';

export const isValidAccessToken = (
  req: Request & { currentUsername: string },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secret.secret, (err) => {
      if (err) {
        return res.sendStatus(StatusCodes.UNAUTHORIZED);
      } else {
        return res.sendStatus(StatusCodes.OK);
      }
    });
  } else {
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};
