import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserType } from '../../interfaces';
import { Festival } from '../../models/addFestival';
import { User } from '../../models/registerUser';

export const addFestival = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const creator = await User.findOne({
    username: req.customData.username,
  }).exec();
  if (creator.toObject().type === UserType.Firm) {
    return Festival.create({ ...req.body, participants: [creator._id] })
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
