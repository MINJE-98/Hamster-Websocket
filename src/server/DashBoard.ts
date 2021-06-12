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
    // 대쉬보드가 클라이언트에게 행동을 지시합니다.
    public utils(socket: Socket) {
        socket.on('shutdown', ( dashboardID, clientID, data )=>{
            if(!clientID) {
                socket.to(dashboardID).emit("shutdown")
            }
            else socket.to(clientID).emit("shutdown")
        })
        socket.on('reboot', ( dashboardID, clientID, data )=>{
            if(!clientID) {
                socket.to(dashboardID).emit("reboot")
            }
            else socket.to(clientID).emit("reboot")
        })
        socket.on('commnand', ( dashboardID, clientID, data )=>{  
            if(!clientID) {
                socket.to(dashboardID).emit("commnand", data.command)
            }
            else socket.to(clientID).emit("commnand", data.command)
        })
        socket.on('filedown', ( dashboardID, clientID, data )=>{  
            if(!clientID) {
                socket.to(dashboardID).emit("filedown", data.url)
            }
            else socket.to(clientID).emit("filedown", data.url)
        })
    }
  }

  export default new DashBoard();