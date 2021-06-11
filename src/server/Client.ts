import { Socket } from "socket.io";

class Client {
    /**
     * 클라이언트 -> 소켓 -> 대쉬보드
     * 클라이언트가 연결되었을때 대쉬에게 전달한 정보 on (client_setClientInfo)
     * 대쉬보드가 요청 했을때 클라이언트의 정보 알려주기 emit (client_getClientInfo)
     */
    clientInfo: Object = {};
    // 클라이언트가 대쉬보드에게 정보를 전달
    public setClientInfo(socket: Socket, room: string) {
        socket.on('client_setClientInfo', (clientIP) =>{
          this.clientInfo = {socketID: socket.id, clientIP: clientIP};
          socket.to(room).emit("dashBoard_setClientInfo", this.clientInfo);
          // console.log(clientObject.dashSocketID);
          
          // if(!clientObject.dashSocketID){
          //   socket.to(room).emit("dashBoard_setClientInfo", this.clientInfo);
          // }
          // else{
          //   socket.to(room).to(clientObject.dashSocketID).emit("dashBoard_setClientInfo", this.clientInfo);
          // }
        })
      }
    // 연결 끊김
    public disconnect(socket: Socket, room: string) {
      socket.on("disconnect", ()=>{
          console.log(socket.id + ": 연결 해제");
          socket.to(room).emit("dashBoard_clientDisconnect", this.clientInfo);
      })
    }
  }

  export default new Client();