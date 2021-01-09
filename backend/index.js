// Absolute BARE minimum for a socket.io server
// npm install express, socket.io, nodemon(optional)
const app = require('express')();
const http = require('http').createServer(app);

//manage cors requests (NECESSARY since we'll be hosting front and backend separate)
const io = require("socket.io")(http, {
cors: {
    //origin of request
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}
});

// event 'connection' creates a socket
io.on('connection', (socket) => {
    console.log("User connected");
    console.log(socket.id);
    // this is where we can add custom emiters and events (and the data they will send and recieve)
    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message});
    })
})

//listening on the server
http.listen(4000, () => {
    console.log("Running on port 4000");
})