# Hamster-WebSocket
Real-time client-dashboard communication service
SocketIO를 통해 한 클라이언트, 대쉬보드 실시간 통신 서비스

# Project Architecture
![image](https://user-images.githubusercontent.com/55491354/122352460-1df58c00-cf8a-11eb-9fa3-f187dd9ee9c1.png)

## Project requirement
Hamster [Dashboard](https://github.com/argon1025/Hamster-Dashboard)\
Hamster [SocketIO-Server](https://github.com/MINJE-98/Hamster-Websocket)\
Hamster [Client](https://github.com/argon1025/Hamster-client)

# Project Stack
- EC2
- pm2
- Socket.io
- Typescript


# Feature
- Relay communication between the client and the dashboard.

# Installation
### 1.Clone this Project
```
git clone https://github.com/MINJE-98/Hamster-Websocket.git
```

### 2.install all dependencies
```
npm install
```

### 3.install pm2
```
npm pm2 install -g
```

### 4.Started with pm2
```
npm run start-pm2
```

# Issues
[Here](https://github.com/MINJE-98/Hamster-Websocket/issues)
