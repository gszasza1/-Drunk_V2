import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Festival } from '../../models/addFestival';

export const getFestivalbyId = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  return Festival.findOne({ id: req.body.id })
    .populate("user")
    .then((x) => {
      console.log(x);
      res.status(StatusCodes.OK).send(x);
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
