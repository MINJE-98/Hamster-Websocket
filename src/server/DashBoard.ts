import { Socket } from "socket.io";

class DashBoard {
  socket: any;
  /**
   * 대쉬보드 -> 소켓 -> 클라이언트
   */

  constructor(socket: Socket) {
    this.socket = socket;
  }
  // 대쉬보드가 소켓에게 클라이언트 정보를 요청합니다.
  public getClientInfo() {
    this.socket.on("dashBoard_getClientInfo", (DashSocketID: number) => {
      this.socket.join(DashSocketID);
      console.log("createRoom", DashSocketID);
      this.socket.broadcast.emit("client_getClientInfo", DashSocketID);
    });
  }
  // 클라이언트에게 명령을 내립니다.
  public commandClient() {
    // 전체 유저에게 명령
    this.socket.on("all-users", (dashboardID: number, data: any) => {
      console.log("all-users");
      console.log(dashboardID, data);
      const clientID = data.clientID;
      switch (data.type) {
        case "shutdown":
          console.log(`[${dashboardID}] order ${clientID} to shutdown`);
          this.socket.broadcast.emit("shutdown", dashboardID);
          break;
        case "reboot":
          console.log(`[${dashboardID}] order ${clientID} to reboot`);
          this.socket.broadcast.emit("reboot", dashboardID);
          break;
        case "commnand":
          console.log(
            `[${dashboardID}] order ${clientID} to command/${data.command} `
          );
          this.socket.broadcast.emit("command", dashboardID, data.command);
          break;
        case "filedown":
          console.log(
            `[${dashboardID}] order ${clientID} to filedownload/${data.url} `
          );
          this.socket.broadcast.emit("filedown", dashboardID, data.url);
          break;
      }
    });
    // 특정 유저에게 명령
    this.socket.on("single-users", (dashboardID: string, data: any) => {
      console.log("single-users");
      console.log(dashboardID, data);

      const clientID = data.clientID;
      switch (data.type) {
        case "shutdown":
          console.log(`[${dashboardID}] order ${clientID} to shutdown`);
          this.socket.to(clientID).emit("shutdown", dashboardID);
          break;
        case "reboot":
          console.log(`[${dashboardID}] order ${clientID} to reboot`);
          this.socket.to(clientID).emit("reboot", dashboardID);
          break;
        case "commnand":
          console.log(`[${dashboardID}] order ${clientID} to command/${data} `);
          this.socket.to(clientID).emit("command", dashboardID, data.command);
          break;
        case "filedown":
          console.log(
            `[${dashboardID}] order ${clientID} to filedownload/${data} `
          );
          this.socket.to(clientID).emit("filedown", dashboardID, data.url);
          break;
      }
    });
  }
}

export default DashBoard;
