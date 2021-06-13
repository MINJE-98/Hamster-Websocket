import { Server, Socket } from "socket.io";

import DashBoard from "./DashBoard";
import Client from "./Client";
import App from "./App";

class SocketHandler {
  // 소켓 연결
  room: string = "Hamster";
  constructor(io: Server) {
    io.on("connect", (socket: Socket) => {
      console.log(`Connection ID: ${socket.id}`);
      // DashBoard.createRoom(socket);
      DashBoard.getClientInfo(socket);
      Client.setClientInfo(socket);
      Client.disconnect(socket);
      Client.newClient(socket);
      Client.utilLogs(socket);
      DashBoard.utils(socket);
    });
  }


}
export default new SocketHandler(App.socketioServer);
