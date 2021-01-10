const generateID = require('./generate_id');
const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
// manages cors requestsi
app.use(cors())
const io = require("socket.io")(http, {
    cors: {
        //origin of request
        origin: "*",
        methods: ["GET", "POST"],
        // credentials: true,
    }
});

const clientRooms = {};

// event 'connection' creates a socket
io.on('connection', (socket) => {
    console.log("User connected");
    
    // this is where we can add custom and events (and the data they will send and recieve)
    socket.on('newGame', handleNewGame);
    socket.on('joinGame', handleJoin);
    socket.on('playerMove', hanldleMove);
    socket.on('gameOver', handleGameOver);
    socket.on('playerQuit', handlePlayerQuit);
    socket.on('disconnect', handlePlayerQuit);


    //called when a new game is desired
    function handleNewGame() {
        
        //generates new room and joins it
        let room = generateID(5);
        clientRooms[socket.id] = room;
        //lets the frontend see the unique gamecode
        socket.emit('gamecode', room);

        socket.join(room);
        socket.number = 1;
        socket.emit('players', '1');

    }

    function handleJoin(roomCode) {
        //looks for the room with the specified roomCode
        const room = Object.fromEntries(io.sockets.adapter.rooms);

        //sets the total number of clients
        let clients = 0;
        if (room && room[roomCode]) {
            clients = room[roomCode].size;
        }

        //if there are no clients the room code is invalid
        if (clients === 0) {
            socket.emit('code', 'unknown invite code');
            return;
        }
        //if there's more than one the lobby is already full
        else if (clients > 1) {
            socket.emit('code', 'lobby full');
            return;
        }

        //sets up joining everything
        clientRooms[socket.id] = roomCode;

        socket.join(roomCode);
        socket.number = 2;
        socket.emit('players', '2');
        socket.emit('gamecode', roomCode);
        io.sockets.in(roomCode).emit('gamePlayable', true);
    }

    //handles movements on the chessboard, messanger between players
    function hanldleMove(move) {

        //gets he room based on the socket.id
        const room = clientRooms[socket.id];

        if (!room) {
            return;
        }

        //emits that a player has moved and emits to toggle player moves
        io.sockets.in(room).emit('playerMove', move);
        io.sockets.in(room).emit('toggleTurn')
    }

    //sends the winning player to all players in lobby
    function handleGameOver(winner) {
        
        const room = clientRooms[socket.id];

        if (!room) {
            return;
        }

        io.sockets.in(room).emit('winner', winner);
    }

    //handles when player quits
    function handlePlayerQuit() {
        disqualifyPlayer();
    }

    //removes a player from the clientRooms object on disconnect (no reason to waste space)
    function cleanLobby() {
        //removes client from clientRooms (does not let new player connect)
        delete clientRooms[socket.id];
    }

    //disqualify player if they disconnect or quit, sets opponent as winner
    function disqualifyPlayer() {

        let room = clientRooms[socket.id];
        let winner; 

        if (!room) {
            return;
        }

        if (socket.number == 1) {
            winner = 2;
        }
        else {
            winner = 1;
        }

        io.sockets.in(room).emit('winner', winner);

        cleanLobby(room);
            
    }
})

let port = process.env.PORT || 4000;
//listening on the server
http.listen(port, () => {
    console.log(`Running on port ${port}`);
})