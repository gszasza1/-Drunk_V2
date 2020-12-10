import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { addRefreshToken, refreshTokenExistOnServer } from '.';
import { User } from '../../models/registerUser';
import secret from '../../secret.json';
import { deleteByJWTToken, divideToken } from '../../socket';

export const refreshToken = (
  req: Request & { currentUsername: string },
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;
  if (req.headers.authorization) {
    deleteByJWTToken(divideToken(req.headers.authorization));
  }
  if (refreshTokenExistOnServer(req.body.refreshToken)) {
    const decodedToken = jwt.decode(refreshToken);
    User.findOne({ username: (decodedToken as any).username })
      .then((user) => user.toObject())
      .then((user) => {
        const acceptToken = jwt.sign(
          { username: user.username, type: user.type },
          secret.secret,
          {
            expiresIn: "900s",
          }
        );
        const refreshToken = jwt.sign(
          { username: user.username },
          secret.refresh_secret
        );
        addRefreshToken(refreshToken);

        return res
          .status(StatusCodes.OK)
          .send({ accessToken: "Bearer " + acceptToken, refreshToken });
      });
  } else {
    res.status(StatusCodes.BAD_REQUEST).send({ error: "Lejárt session" });
  }
};
