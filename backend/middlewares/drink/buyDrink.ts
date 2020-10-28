import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { webSocket } from '../../app';
import { IBuyDrinkSchema, IDrinkPopulated, UserType } from '../../interfaces';
import { BuyDrink } from '../../models/buyDrink';
import { Drink } from '../../models/drink';
import { User } from '../../models/registerUser';
import { getSocketIdsByUserName } from '../../socket';
import { allSocketId } from '../../socket/allSocketId';

export const buyDrink = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  console.log(0);
  const creator = await User.findOne({
    username: req.customData.username,
  }).exec();
  console.log(creator.toObject());
  if (creator.toObject().type === UserType.Member) {
    return BuyDrink.create({ ...req.body, buyer: creator._id })
      .then((x) => x.toObject())
      .then(async (x: IBuyDrinkSchema) => {
        console.log(1);
        const providerDrink = (await (
          await Drink.findById(x.drinkId).populate("provider").exec()
        ).toObject()) as IDrinkPopulated;
        console.log(2);
        const socketIds = getSocketIdsByUserName(
          providerDrink.provider.username
        );
        console.log(3);
        socketIds.forEach((socketId) => {
          webSocket.to(socketId).emit(allSocketId.ALCOHOL_BOUGHT, {
            id: x._id,
            drinkName: providerDrink.drinkName,
            number: x.number,
          });
        });
        console.log(4);
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
