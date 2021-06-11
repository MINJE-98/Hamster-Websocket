import { Socket } from "socket.io";

class Connect {
    public disconnect(socket: Socket, room: string) {
        socket.on("disconnect", ()=>{
            console.log(socket.id + ": 연결 해제");
            socket.to(room).emit("dashBoard_clientDisconnect", socket.id);
        })
    }
}

export default new Connect();