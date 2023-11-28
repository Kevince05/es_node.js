const net = require("net");

let cl = "";
let buff = "";
const sv = net.createServer((socket) => {
    socket.on("data", (data) => {
        buff += data;
        if (buff.endsWith("\n")) {
            switch (buff.trim()) {
                case "quit":
                    socket.end();
                    break;
                case "exit":
                    socket.end();
                    break;

                default:
                    socket.write(buff);
                    buff = "";
                    break;
            }
        }
    });
    socket.on("end", () => {
        console.log(cl + "-disconnected ");
        buff = "";
    })

});

sv.on("connection", (socket) => {
    cl = "welcome " +
        socket.remoteAddress == "::1" ? "localhost" : socket.remoteAddress.replace("::ffff", "") +
        ":" + socket.remotePort;
    socket.write(cl + "\r\n");
});

sv.listen(7979);