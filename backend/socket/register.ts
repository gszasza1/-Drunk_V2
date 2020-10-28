import { Socket } from 'socket.io';

import { addToken, divideToken } from '../socket';
import { allSocketId } from './allSocketId';

export const register = (socket: Socket) => {
  socket.on(allSocketId.DEFINE_ID, (localSocket) => {
    if (socket) {
      console.log("alma");
      addToken(divideToken(localSocket.accessToken), socket.id);
    }
  });
};
