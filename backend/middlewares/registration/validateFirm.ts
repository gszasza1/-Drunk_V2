import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { User } from '../../models/registerUser';

export const validateFirmInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, fullName }: User = req.body;
  if (
    !password ||
    !username ||
    !fullName ||
    typeof password !== "string" ||
    typeof username !== "string" ||
    typeof fullName !== "string"
  ) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
  } else if (password.length < 6) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Jelszónak 6 karakternél hosszabbnak kell lennie." });
  } else if (username.length < 6) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: "Felhasználónévnek 6 karakternél hosszabbnak kell lennie.",
    });
  } else if (fullName.length < 2) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: "Teljes névnek 2 karakternél hosszabbnak kell lennie.",
    });
  } else {
    User.find({ username: req.body.username }).then((x) => {
      if (x.length > 0) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Foglalt felhasználónév" });
      } else {
        return next();
      }
    });
  }
};
