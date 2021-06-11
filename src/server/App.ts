import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'

class App {

    public express: express.Application = express();
    public httpServer: http.Server = http.createServer(this.express);
    public socketioServer: Server =  new Server(this.httpServer);

    constructor() {
        this.configs()
        this.middlewares()
    }

    private configs() {
        this.express.set('port', process.env.PORT || 8080)
    }

    private middlewares() {
        this.express.use(cors())
    }

}

export default new App()
