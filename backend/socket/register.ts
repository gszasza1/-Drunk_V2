import { Socket } from 'socket.io';

import { addToken, deleteBySocketId, divideToken } from '../socket';
import { allSocketId } from './allSocketId';

export const register = (socket: Socket) => {
  socket.on(allSocketId.DEFINE_ID, (localSocket) => {
    if (socket && localSocket.accessToken) {
      console.log("created");
      addToken(divideToken(localSocket.accessToken), socket.id);
    }
  });
  socket.on(allSocketId.DELETE_ID, () => {
    if (socket) {
      console.log("destroyed");
      deleteBySocketId(socket.id);
    }
  });
};
