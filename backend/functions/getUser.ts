import jwt_decode from 'jsonwebtoken';

import { IDecodedToken, IUserSchema } from '../interfaces';
import { User } from '../models/registerUser';
import secret from '../secret.json';
import { divideToken } from '../socket';

export const getUserByJWT = async (token: string) => {
  if (!token) {
    throw Error;
  }
  const tokenDivided = divideToken(token);
  try {
    const decodedToken = jwt_decode.verify(tokenDivided, secret.secret);
    if (typeof decodedToken === "string") {
      throw Error;
    }
    if (typeof decodedToken === "object") {
      const castToken = decodedToken as IDecodedToken;
      const findUserInformation: IUserSchema = await (
        await User.findOne({ username: castToken.username }).exec()
      ).toObject();
      return findUserInformation;
    }
  } catch (error) {
    throw Error;
  }
};
