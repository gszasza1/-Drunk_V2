import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BuyDrink } from '../../models/buyDrink';
import { Drink } from '../../models/drink';

export const getCurrentDrinkByUser = async (
  req: Request & { customData: any },
  res: Response,
  next: NextFunction
) => {
  const providerDrink = await (await Drink.find().populate("provider").exec())
    .map((x) => x.toObject())
    .filter((x) => x.provider.username !== req.customData.username)
    .map((x) => ({ id: x._id + "", drinkName: x.drinkName + "" }));
  const sajt = await BuyDrink.find().exec();

  const alma = sajt
    .map((x) => x.toObject())
    .filter((r) => {
      return providerDrink.map((t) => t.id).includes(r.drinkId + "");
    })
    .map((x) => ({
      ...x,
      drinkName: providerDrink.find((q) => {
        return q.id + "" === x.drinkId + "";
      }).drinkName,
    }));
  return res.status(StatusCodes.OK).send(alma);
};
