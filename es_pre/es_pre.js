const net = require("net");

const commands = [
    "command_1",
    "quit",
    "bcast",
    "need_ack"
]

const sockets = {}

const sv = net.createServer((socket) => {
    const sock_id = socket.remoteAddress + ":" + socket.remotePort
    let buff = ""
    socket.lock = false
    let command = ""
    let param = []
    let tmp = null

    socket.on('data', (data) => {
        if (data === "\r\n") {
            if (lock) {
                if(buff === "ok"){
                    lock = false
                }
            } else {
                tmp = buff.split(" ")
                command = tmp[0]
                param = tmp.slice(1, tmp.length() + 1)//compreso ultimo elemento

                if (commands.includes(command)) {
                    sv.emit(command, sock_id, param[0] != null ? param[0] : null, param[1] != null ? param[1] : null)
                }else{
                    write(buff);
                }
            }
        }
        buff += data
    })
})

sv.on("connection", (socket) => {
    console.log(socket.remoteAddress + ":" + socket.remotePort + " Connected!")
    sockets[socket.remoteAddress + ":" + socket.remotePort] = socket
    socket.write("")
})

sv.on("command_1", (sender, p1, p2) => {
    sockets[sender].write("command_1: " + p1 + " " + p2)
})

sv.on("quit", (sender) => {
    sockets[sender].close();
    delete sockets[sender]
})

sv.on("bcast", (sender, message) => {
    sockets.forEach(e => {
        sockets[e].write(message);
    })
})

sv.on("need_ack", (sender, target) => {
    sockets[target].lock = true;
})

sv.listen(1234)