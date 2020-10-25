import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Festival } from '../../models/addFestival';

export const getFestivals = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  return Festival.find({})
    .then((x) => {
      console.log(x);
      const sendBack = x
        .map((x) => x.toObject())
        .map((y) => ({
          time: y.time,
          place: y.place,
          name: y.festivalName,
          id: y._id,
        }));
      res.status(StatusCodes.OK).send(sendBack);
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
