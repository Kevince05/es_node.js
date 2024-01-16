const net = require("net")
const sockets = {}

const sv = net.createServer((socket) => {
    let buff = ""
    socket.on("data", (data) => {
        buff += data
        if (buff.endsWith("\n")) {
            if (socket.readyState === socket.OPEN) {
                socket.write(buff)
            }
            sv.emit(buff.trim().toString(), socket.remoteAddress + ":" + socket.remotePort)
            buff = "";
        }
    })
    socket.on("end", () => {
        delete sockets[cl.toString()]
        console.log(cl + " -- disconnected ")
        buff = ""
    })

})

sv.on("quit", (sock_key) => {
    sockets[sock_key].end()
    delete sockets[sock_key]
})
sv.on("exit", (sock_key) => {
    sockets[sock_key].end()
    delete sockets[sock_key]
})
sv.on("quitall", () => {
    sockets.values.forEach(s => {
        s.end()
    })
})

sv.on("connection", (socket) => {
    socket.write((socket.remoteAddress === "::1" ? "localhost" : socket.remoteAddress.replace("::ffff", "")) + ":" + socket.remotePort + "\r\n")
    sockets[socket.remoteAddress + ":" + socket.remotePort] = socket
})

sv.listen(7979)