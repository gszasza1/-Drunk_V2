import jwt from 'jsonwebtoken';

import secret from './secret.json';

var currentConnections = {};

export const checkConnectionExist = (
  connectToken: string,
  params?: { ifNotExist: () => void; ifExist?: () => void }
): boolean => {
  if (Object.values(currentConnections).includes(connectToken)) {
    if (!!(params && params.ifExist)) {
      params.ifExist();
    }
    return true;
  } else if (!!(params && params.ifNotExist)) {
    params.ifNotExist();
  }
};

export const getJWTToken = (connectToken: string) =>
  currentConnections[connectToken];

export const addToken = async (
  connectToken: string,
  params: { accessToken: string }
) => {
  try {
    const validToken = await jwt.verify(params.accessToken, secret.secret);
    console.log(validToken);
    currentConnections[params.accessToken] = connectToken;
  } catch {
    console.log("invalid token");
  }
};

export const deleteByJWTToken = (connectToken: string) =>
  checkConnectionExist(connectToken) && delete currentConnections[connectToken];

export const deleteBySocketIo = (
  connectToken: string,
  params: { accessToken: string }
) => {
  for (var key in currentConnections) {
    if (currentConnections[key] == params.accessToken)
      delete currentConnections[key];
  }
};

export const hardResetConnectionStore = () => (currentConnections = {});
export const divideToken = (token: string) => token.split(" ")[1];
