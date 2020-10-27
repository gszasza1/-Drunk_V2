import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Festival } from '../../models/addFestival';
import { User, UserType } from '../../models/registerUser';

export const participateInFestival = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const addUser = await User.findOne({
    username: req.customData.username,
  }).exec();
  if (addUser.toObject().type === UserType.Firm) {
    return Festival.update(
      { _id: req.params.id },
      { $push: { participants: addUser._id } }
    )
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
