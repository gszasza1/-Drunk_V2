import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BuyDrink } from '../../models/buyDrink';

export const deleteCurrentDrinkByUser = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  console.log(req.params);
  return BuyDrink.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(StatusCodes.OK).send("Sikeres kiadás");
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
