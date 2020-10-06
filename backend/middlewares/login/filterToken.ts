import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { filterToken } from '.';

export const filterRefreshToken = (
  req: Request & { currentUsername: string },
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;
  filterToken(token);
  res.status(StatusCodes.OK).send("Sikeres kijelentkezés");
};
