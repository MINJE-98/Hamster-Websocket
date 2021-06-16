import { Server, Socket } from "socket.io";

import DashBoard from "./DashBoard";
import Client from "./Client";
import App from "./App";

class SocketHandler {
  // 소켓 연결
  constructor(io: Server) {
    io.on("connect", (socket: Socket) => {
      const req = socket.request;
      const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      console.log(req);

      console.log(ip);

      console.log(`Connection ID: ${socket.id}`);
      const dashboard = new DashBoard(socket);
      const client = new Client(socket);

      dashboard.getClientInfo();
      dashboard.commandClient();

      client.setClientInfo();
      client.disconnect();
      client.newClient();
      client.utilLogs();
    });
  }
}
export default new SocketHandler(App.socketioServer);
