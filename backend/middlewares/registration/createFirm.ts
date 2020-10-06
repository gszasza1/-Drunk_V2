import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User, UserType } from '../../models/registerUser';

export const createFirm = (req: Request, res: Response, next: NextFunction) => {
  User.create({ ...req.body, type: UserType.Firm })
    .then((x) => {
      res.status(StatusCodes.OK).send("Sikeres regisztráció");
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
