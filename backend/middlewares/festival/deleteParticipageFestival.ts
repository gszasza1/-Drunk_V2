import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { IFestival, UserType } from '../../interfaces';
import { Festival } from '../../models/addFestival';
import { User } from '../../models/registerUser';

export const deleteParticipageFestival = async (
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
    const temp = await Festival.findOne({ _id: req.params.id });
    let decodedDocument: IFestival = temp.toObject();

    temp["participants"] = decodedDocument.participants.filter(
      (x) => x + "" !== deleteUser._id + ""
    );
    return temp
      .save()
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
