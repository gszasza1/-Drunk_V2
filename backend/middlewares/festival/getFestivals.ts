import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Festival } from '../../models/addFestival';
import { User } from '../../models/registerUser';

export const getFestivals = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const userInFestival = await User.findOne({
    username: req.customData.username,
  }).exec();
  return Festival.find({})
    .then((x) => {
      const sendBack = x
        .map((z) => z.toObject())
        .map((y) => {
          return {
            time: y.time,
            place: y.place,
            name: y.festivalName,
            participate: (y.participants as string[])
              .map((d) => d + "")
              .includes(userInFestival._id + ""),
            id: y._id,
          };
        });
      res.status(StatusCodes.OK).send(sendBack);
    })
    .catch((x) => {
      res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
    });
};
