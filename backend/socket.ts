import jwt from 'jsonwebtoken';

import { IDecodedToken } from './interfaces';
import secret from './secret.json';

interface IConnections {
  [jwtToken: string]: { socketId: string; username };
}

var currentConnections: IConnections = {};

export const checkConnectionExist = (
  jwtToken: string,
  params?: { ifNotExist: () => void; ifExist?: () => void }
): boolean => {
  if (Object.keys(currentConnections).includes(jwtToken)) {
    if (!!(params && params.ifExist)) {
      params.ifExist();
    }
    return true;
  } else if (!!(params && params.ifNotExist)) {
    params.ifNotExist();
  }
};

export const getJWTTokenBySocketId = (socketId: string) => {
  let index: number;
  Object.values(currentConnections).forEach((x, i) => {
    if (x.socketId === socketId) {
      index = i;
    }
  });
  return Object.keys(currentConnections)[index];
};
export const getSocketIdByJwtToken = (JWTToken: string) =>
  currentConnections[JWTToken].socketId;

export const getSocketIdsByUserName = (username: string) =>
  Object.values(currentConnections)
    .filter((x) => x.username === username)
    .map((y) => y.socketId);
export const getUserNamesBySocketId = (socketId: string) =>
  Object.values(currentConnections).find((x) => x.socketId === socketId)
    .username;

export const addToken = async (jwtToken: string, socketId: string) => {
  try {
    const decodedToken = (await jwt.verify(
      jwtToken,
      secret.secret
    )) as IDecodedToken;
    if (typeof decodedToken === "object") {
      currentConnections[jwtToken] = {
        socketId,
        username: decodedToken.username,
      };
    } else {
      throw Error;
    }
  } catch {
    delete currentConnections[jwtToken];
    console.log("invalid token");
  }
};

export const deleteByJWTToken = (jwtToken: string) =>
  checkConnectionExist(jwtToken) && delete currentConnections[jwtToken];

export const deleteBySocketIo = (socketId: string) => {
  let index: number;
  Object.values(currentConnections).forEach((x, i) => {
    if (x.socketId === socketId) {
      index = i;
    }
  });
  const selectedToken = Object.keys(currentConnections)[index];
  delete currentConnections[selectedToken];
};

export const hardResetConnectionStore = () => (currentConnections = {});
export const divideToken = (token: string) => token.split(" ")[1];
