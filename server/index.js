const { instrument } = require("@socket.io/admin-ui");

const io = require("socket.io")(3000, {
    cors: {
        origin: [
            "http://localhost:8080",
            "https://admin.socket.io",
            "https://admin.socket.io/#/",
        ],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("send-message", (message, room) => {
        console.log(room, message);
        if (room === "") {
            socket.broadcast.emit("received-message", message);
        } else {
            socket.to(room).emit("received-message", message);
        }
    });
    socket.on("join-room", (room, cb) => {
        socket.join(room);
        cb(`Joined ${room}`);
    });
});

instrument(io, { auth: false });
