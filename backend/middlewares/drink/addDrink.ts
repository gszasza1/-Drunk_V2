import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserType } from '../../interfaces';
import { Drink } from '../../models/drink';
import { User } from '../../models/registerUser';

export const addDrink = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const creator = await User.findOne({
    username: req.customData.username,
  }).exec();
  if (creator.toObject().type === UserType.Firm) {
    return Drink.create({ ...req.body, provider: creator._id })
      .then((x) => {
        res.status(StatusCodes.OK).send("Sikeres felvétel");
      })
      .catch((x) => {
        res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
      });
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .send({ error: "Nincs jogosultság" });
  }
};
