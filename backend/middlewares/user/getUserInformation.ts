import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/registerUser';

export const getUserInformation = (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const { username } = req.customData;
  User.findOne({ username })
    .then((user) => user.toObject())
    .then((x) => {
      console.log(x);
      res
        .status(StatusCodes.OK)
        .send({
          username,
          type: x.type,
          createdAt: x.createdAt,
          fullName: x.fullName,
        });
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
