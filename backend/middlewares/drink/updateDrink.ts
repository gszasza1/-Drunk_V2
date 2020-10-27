import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Drink } from '../../models/drink';
import { User } from '../../models/registerUser';

export const updateDrinkbyId = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const creator = await User.findOne({
    username: req.customData.username,
  }).exec();
  return Drink.findOne({ _id: req.params.id })
    .populate("provider")
    .then((x) => {
      if (x.toObject().provider._id + "" === creator._id + "") {
        x.update({ ...req.body }).then(() =>
          res.status(StatusCodes.OK).send("Sikeres módosítás")
        );
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "csak saját itelt lehet módosítani" });
      }
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
