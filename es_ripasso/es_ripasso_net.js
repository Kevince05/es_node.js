const net = require("net");
const { send } = require("process");
const sockets = {}

let next_id = 0;

const server = net.createServer((socket) => {
    let buff = ""
    let id = next_id
    next_id++
    sockets[id] = socket;

    socket.on("data", (data) => {
        if (buff.endsWith("\r\n")) {
            buff = buff.trim().split(" ")
            server.emit(buff[0], id, (buff[1] != undefined) ? buff[1] : null, (buff[2] != undefined) ? buff[2] : null);
        }
        buff += data;
    })

    socket.on("connect", () => {

    })
})

//add ack from recv
server.on("bcast", (sender, message) => {
    sockets[0].write(message)
    sockets[sockets.length - 1].write(message)
})

server.on("exit", (sender)){
    console.log("Client n: " + sender + " disconnected (" + sockets.length + ")")
    sockets[sender].write("Client n: " + sender + " disconnected");
    sockets[sender].end()
    delete sockets[sender]
}

sv.on("connection", (socket) => {
    socket.write("Welcome to Cesco Kevin's server")
})

