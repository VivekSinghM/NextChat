import { Socket } from "socket.io";

export interface CustomSocketEvents {
  ClientToServerEvents: Record<string, Function>;
  ServerToClientEvents: Record<string, Function>;
  InterServerEvents: Record<string, Function>;
  SocketData: Record<string, any>;
}

export type CustomSocketType<T extends CustomSocketEvents> = Socket<
  T["ClientToServerEvents"],
  T["ServerToClientEvents"],
  T["InterServerEvents"],
  T["SocketData"]
>;
export type CustomEventsType<T extends CustomSocketEvents> = {
  eventListener: T["ClientToServerEvents"];
  eventEmitter: T["ServerToClientEvents"];
};

interface CustomSocketHandlerInterface<T extends CustomSocketEvents> {
  bindEvents(socket: CustomSocketType<T>): void;
  handleConnection(socket: CustomSocketType<T>): void;
  middleware?(socket: CustomSocketType<T>, next: any): void;
}

export default CustomSocketHandlerInterface;
