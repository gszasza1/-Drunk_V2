import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Drink } from '../../models/drink';
import { User, UserType } from '../../models/registerUser';

interface localDrink {
  DrinkName: string;
  place: string;
  time?: Date;
  ticket?: { ticketName: string; ticketPrice: number }[];
  participants?: string[];
}

export const deleteParticipageDrink = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  if (!req.params.id) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
  }
  const deleteUser = await User.findOne({
    username: req.customData.username,
  }).exec();
  if (deleteUser.toObject().type === UserType.Firm) {
    return Drink.deleteOne({ _id: req.params.id, provider: deleteUser._id })
      .then((x) => {
        res.status(StatusCodes.OK).send("Sikeres törlés");
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
