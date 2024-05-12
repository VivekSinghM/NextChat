import { Server, Socket } from "socket.io";

const WEBSOCKET_CORS = {
  origin: "*",
  methods: ["GET", "POST"],
};

class Websocket extends Server {
  private static io: Websocket;

  constructor(httpServer) {
    super(httpServer, {
      cors: WEBSOCKET_CORS,
    });
  }

  public static getInstance(httpServer?): Websocket {
    if (!Websocket.io) {
      Websocket.io = new Websocket(httpServer);
    }

    return Websocket.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = Websocket.io
        .of(element.path, (socket: Socket) => {
          element.handler.handleConnection(socket);
        })
        .on("connect", (socket) => {
          socket.data = { ...socket.data, id: socket.handshake.query.id };
          console.log("Chat socket connected");
        });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}

export default Websocket;
