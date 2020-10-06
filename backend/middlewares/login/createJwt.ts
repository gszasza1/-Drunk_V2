import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from '../../models/registerUser';
import secret from '../../secret.json';

export const createJwt = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  return User.findOne({ username })
    .then((user) => user.toObject())
    .then((user) => {
      bcrypt.compare(password, user.password).then((checked) => {
        if (checked) {
          const token = jwt.sign({ user }, secret.secret, {
            expiresIn: "6000s",
          });
          console.log(req.body);
          return res
            .status(StatusCodes.OK)
            .send({ accesToken: "Bearer " + token });
        } else {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .send({ error: "Rossz jelszó vagy felhasználó" });
        }
      });
    })
    .catch(() =>
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ error: "Rossz jelszó vagy felhasználó" })
    );
};
