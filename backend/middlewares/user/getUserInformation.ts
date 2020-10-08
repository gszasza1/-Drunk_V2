import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/registerUser';

export const getUserInformation = (
  req: Request,
  res: Response & { customData: any },
  next: NextFunction
) => {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => user.toObject())
    .then((x) => {
      res.status(StatusCodes.OK).send({ username, type: username.type });
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
