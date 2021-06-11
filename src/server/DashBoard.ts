import { Socket } from "socket.io";

class DashBoard {
    /**
     * 대쉬보드 -> 소켓 -> 클라이언트
     * 연결되었을때 소켓서버에게 클라이언트 정보 요청 -> emit (dashBoard_setClientInfo)
     * 새로운 클라이언트가 접속했을 시 클라이언트 정보 획득 -> on (dahsBoard_getClientInfo)
     */
    // 대쉬보드가 소켓에게 클라이언트 정보를 요청합니다.
    public getClientInfo(socket: Socket, room: string) {
        socket.on('dashBoard_getClientInfo', (DashSocketID)=> {
            socket.to(room).emit('client_getClientInfo', DashSocketID)
        })
    }
    // 대쉬보드가 클라이언트에게 행동을 지시합니다.
    public Utils(socket: Socket, room: string) {
        socket.on('shutdown', (data)=>{
            if(!data) {
                socket.to(room).emit("shutdown")
            }
            else socket.to(data.socketID).emit("shutdown")
        })
        socket.on('reboot', (data)=>{
            if(!data) {
                socket.to(room).emit("reboot")
            }
            else socket.to(data.socketID).emit("reboot")
        })
        socket.on('commnand', (data)=>{  
            if(!data) {
                socket.to(room).emit("commnand", data.command)
            }
            else socket.to(data.socketID).emit("commnand", data.command)
        })
        socket.on('filedown', (data)=>{  
            if(!data) {
                socket.to(room).emit("filedown", data.url)
            }
            else socket.to(data.socketID).emit("filedown", data.url)
        })
    }
  }

  export default new DashBoard();