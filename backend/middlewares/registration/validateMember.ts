import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Member } from '../../models/registerMember';

export const validateMemberInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password }: Member = req.body;
  if (
    !password ||
    !username ||
    typeof password !== "string" ||
    typeof username !== "string"
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
  } else {
    Member.find({ username: req.body.username }).then((x) => {
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
