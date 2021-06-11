import io from 'socket.io-client'

let socket = io()

setInterval( () => {
    socket = io('http://localhost:8080/')
}, 3000)

setInterval( () => {
    socket.emit('msg', 'Test MSG')
}, 5000)