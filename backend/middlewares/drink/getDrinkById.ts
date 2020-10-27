import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Drink } from '../../models/drink';
import { User } from '../../models/registerUser';

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
          ...(x.toObject().participants as (User & {
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
