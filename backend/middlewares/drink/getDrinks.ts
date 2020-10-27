import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Drink } from '../../models/drink';

export const getDrinks = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  return Drink.find({})
    .populate("provider")
    .then((x) => {
      const sendBack = x
        .map((z) => z.toObject())
        .map((y) => {
          return {
            drinkName: y.drinkName,
            price: y.price,
            provider: y.provider.fullName,
            id: y._id,
          };
        });
      res.status(StatusCodes.OK).send(sendBack);
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
