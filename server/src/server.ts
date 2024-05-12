import dotenv from "dotenv";
import "reflect-metadata";
dotenv.config();

import ChatHandler from "./modules/websocket/chat.socket";
import Websocket from "./modules/websocket/Websocket";
import { createServer } from "http";

const runtime_args = require("minimist")(process.argv.slice(2));

const port = runtime_args["port"] || process.env.APP_PORT || 8000;

const httpServer = createServer();
const io = Websocket.getInstance(httpServer);

io.initializeHandlers([{ path: "/chat", handler: new ChatHandler() }]);

httpServer.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
