import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserType } from '../../interfaces';
import { User } from '../../models/registerUser';

export const createMember = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  User.create({ ...req.body, type: UserType.Member })
    .then((x) => {
      res.status(StatusCodes.OK).send("Sikeres regisztráció");
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
