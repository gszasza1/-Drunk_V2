import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/registerUser';

export const validateMemberInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: User = req.body;
  if (
    !password ||
    !username ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Hibás formátum" });
  } else if (password.length < 6) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Jelszónak 6 karakternél hosszabbnak kell lennie." });
  } else if (username.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Felhasználónévnek 6 karakternél hosszabbnak kell lennie.",
    });
  } else {
    return User.find({ username: req.body.username }).then((x) => {
      if (x.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Foglalt felhasználónév" });
      } else {
        return next();
      }
    });
  }
};
