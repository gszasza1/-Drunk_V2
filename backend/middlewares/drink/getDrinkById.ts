import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IUser } from '../../interfaces';
import { Drink } from '../../models/drink';

export const getDrinkbyId = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  return Drink.findOne({ _id: req.params.id })
    .populate("provider")
    .then((x) => {
      const sendBack = {
        ...x.toObject(),
        participants: [
          ...(x.toObject().participants as (IUser & {
            _id: string;
          })[]).map((y) => ({ id: y._id, fullName: y.fullName })),
        ],
      };
      res.status(StatusCodes.OK).send(sendBack);
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
