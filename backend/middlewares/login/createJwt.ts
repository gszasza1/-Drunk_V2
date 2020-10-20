import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { User } from '../../models/registerUser';
import secret from '../../secret.json';

export let refreshTokens = [];

export const createJwt = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  return User.findOne({ username })
    .then((user) => user.toObject())
    .then((user) => {
      bcrypt.compare(password, user.password).then((checked) => {
        if (checked) {
          const acceptToken = jwt.sign(
            { username: user.username, type: user.type },
            secret.secret,
            {
              expiresIn: "600s",
            }
          );
          const refreshToken = jwt.sign(
            { username: user.username },
            secret.refresh_secret
          );
          refreshTokens.push(refreshToken);

          return res
            .status(StatusCodes.OK)
            .send({ accessToken: "Bearer " + acceptToken, refreshToken });
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

export const filterToken = (token: string) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
};
export const refreshTokenExistOnServer = (token: string) => {
  const hasToken = refreshTokens.includes(token);
  refreshTokens = refreshTokens.filter((t) => t !== token);
  return hasToken;
};
export const addRefreshToken = (token: string) => refreshTokens.push(token);
