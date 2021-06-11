import { Server, Socket } from "socket.io";

import DashBoard from "./DashBoard";
import Client from "./Client";
import App from "./App";

class SocketHandler {
  // 소켓 연결
  room: string = "Hamster";
  constructor(io: Server) {
    io.on("connect", (socket: Socket) => {
      socket.join(this.room);
      console.log(`Connection ID: ${socket.id}`);
      DashBoard.getClientInfo(socket, this.room);
      Client.setClientInfo(socket, this.room);
      Client.disconnect(socket, this.room);
      DashBoard.Utils(socket, this.room);
    });
  }


}
export default new SocketHandler(App.socketioServer);
