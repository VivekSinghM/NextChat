import { Socket } from "socket.io";

export const subscribe = (io: Socket, room: string, callback?: Function) => {
  console.log("joining room", io.rooms.has(room));
  !io.rooms.has(room) && io.join(room);
  if (callback) callback(true);
};
export const unSubscribe = (io: Socket, room: string, callback?: Function) => {
  console.log("leaving room", { io, room, callback });
  !io.rooms.has(room) && io.leave(room);
  if (callback) callback(true);
};
