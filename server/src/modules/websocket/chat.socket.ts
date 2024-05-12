import { Socket } from "socket.io";
import CustomSocketHandlerInterface, {
  CustomEventsType,
  CustomSocketEvents,
  CustomSocketType,
} from "./types";
import { supabase } from "../../supabase/client";

interface ChatSocketEvents extends CustomSocketEvents {
  ClientToServerEvents: {
    "send-message": (
      io,
      data: { message: string; to: string },
      callback: Function,
      ...x: any
    ) => void;
    join: (io, room: string) => void;
    leave: (io, room: string, ...x: any) => void;
  };
}

type ChatSocketType = CustomSocketType<ChatSocketEvents>;

export default class ChatHandler
  implements CustomSocketHandlerInterface<ChatSocketEvents>
{
  private eventListener: CustomEventsType<ChatSocketEvents>["eventListener"] = {
    "send-message": (io: Socket, { message, to }, callback) => {
      supabase
        .from("chat_messages")
        .insert([
          {
            chat_id: to,
            content: { text: message },
            sender: io.data.id,
            status: "sent",
            type: "text",
          },
        ])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) {
            // console.error(error);
            return callback(null);
          }
          console.log("sending message", io.rooms);
          io.to(to).emit("receive-message", data);
          return callback(data);
        });
    },
    join: (io: Socket, room) => {
      io.join(room);
      // io.data = { ...io.data, chat_id: room };
    },
    leave: (io: Socket, room) => {
      io.leave(room);
    },
  };


  bindEvents(socket: ChatSocketType): void {
    for (let [event, action] of Object.entries(this.eventListener) as {
      [K in keyof typeof this.eventListener]: [
        K,
        (typeof this.eventListener)[K]
      ];
    }[keyof typeof this.eventListener][])
      socket.on(event, (props, callback) => action(socket, props, callback));
  }

  handleConnection(socket: Socket): void {
    this.bindEvents(socket);
    socket.on("disconnect", () => {
      console.log("Chat socket disconnected");
    });
  }
}
