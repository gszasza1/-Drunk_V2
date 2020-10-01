import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Member } from '../../models/registerMember';

export const validateMemberInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, password }: Member = req.body;
  if (
    !password ||
    !name ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Hibás formátum" });
  } else if (password.length < 6) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({ error: "Jelszónak 6 karakternél hosszabbnak kell lennie." });
  } else if (name.length < 6) {
    res.status(StatusCodes.BAD_REQUEST).send({
      error: "Felhasználónévnek 6 karakternél hosszabbnak kell lennie.",
    });
  } else {
    Member.find({ name: req.body.name }).then((x) => {
      if (x) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({ error: "Foglalt felhasználónév" });
      } else {
        return next();
      }
    });
  }
};
