import { Socket } from "socket.io";

class DashBoard {
    /**
     * 대쉬보드 -> 소켓 -> 클라이언트
     * 대쉬보드 클라이언트의 방을 만듭니다. -> on(dashBoard_createRoom)
     * 연결되었을때 소켓서버에게 클라이언트 정보 요청 -> emit (dashBoard_setClientInfo)
     * 새로운 클라이언트가 접속했을 시 클라이언트 정보 획득 -> on (dahsBoard_getClientInfo)
     */
    // 대쉬보드가 소켓에게 클라이언트 정보를 요청합니다.
    public getClientInfo(socket: Socket) {
        socket.on('dashBoard_getClientInfo', (DashSocketID)=> {
            socket.join(DashSocketID)
            console.log("createRoom", DashSocketID);
            socket.broadcast.emit('client_getClientInfo', DashSocketID)
        })
    }
    // 클라이언트에게 명령
    public utils(socket: Socket) {
        socket.on('shutdown', ( dashboardID, clientID )=>{
            console.log('shutdown', dashboardID, clientID );
            if(!clientID) {
                socket.broadcast.emit("shutdown", dashboardID)
            }
            else socket.to(clientID).emit("shutdown", dashboardID)
        })
        socket.on('reboot', ( dashboardID, clientID )=>{
            console.log('reboot', dashboardID, clientID );
            if(!clientID) {
                socket.broadcast.emit("reboot", dashboardID)
            }
            else socket.to(clientID).emit("reboot", dashboardID)
        })
        socket.on('commnand', ( dashboardID, data, clientID)=>{  
            console.log('commnand', dashboardID, data, clientID );
            if(!clientID) {
                socket.broadcast.emit("commnand",dashboardID, data)
            }
            else socket.to(clientID).emit("commnand",dashboardID, data)
        })
        socket.on('filedown', ( dashboardID, data, clientID )=>{  
            console.log('filedown', dashboardID, data, clientID );
            if(!clientID) {
                socket.broadcast.emit("filedown",dashboardID, data)
            }
            else socket.to(clientID).emit("filedown",dashboardID, data)
        })
    }
  }

  export default new DashBoard();