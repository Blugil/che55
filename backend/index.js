// Absolute BARE minimum for a socket.io server
// npm install express, socket.io, nodemon(optional)
const app = require('express')();
const http = require('http').createServer(app);
const generateID = require('./utils');
//manage cors requests (NECESSARY since we'll be hosting front and backend separate)
const io = require("socket.io")(http, {
cors: {
    //origin of request
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
}
});

const state = {};
const clientRooms = {};



// event 'connection' creates a socket
io.on('connection', (socket) => {
    console.log("User connected");
    // this is where we can add custom emiters and events (and the data they will send and recieve)
    socket.on('message', ({name, message}) => {
        io.emit('message', {name, message});
    });

    socket.on('newGame', handleNewGame);
    socket.on('joinGame', handleJoin)

    function handleNewGame() {
        
        //generates new room and joins it
        let room = generateID(5);
        clientRoom[socket.id] = room;
        //lets the frontend see the unique gamecode
        socket.emit('gamecode', room);

        socket.join(room);
        socket.number = 1;
        socket.emit('players', 1);

    }

    function handleJoin(roomCode) {

        //looks for the room with the specified roomCode
        const room = io.sockets.adapter.rooms[roomCode];

        //ges all the sockes in he room
        let users;
        if (room) {
            users = room.sockets;
        }
        console.log(users);
        //sets the total number of clients
        let clients = 0;
        if (users) {
            clients = Object.keys(users).length;
        }
        console.log(cliens);

        //if there are no clients the room code is invalid
        if (clients === 0) {
            socket.emit('code', 'unknown invite code');
            console.log('unknown invite code');
            return;
        }
        //if there's more than one the lobby is already full
        else if (clients > 1) {
            socket.emit('code', 'lobby full');
            console.log('lobby full');
            return;
        }

        //sets up joining everything
        clientRooms[socket.id] = roomCode;

        socket.join(roomCode);
        socket.number = 2;
        socket.emit('players', 2);
    }
})

//listening on the server
http.listen(4000, () => {
    console.log("Running on port 4000");
})