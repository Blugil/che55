import React from 'react';
import io from 'socket.io-client';
import './app.scss';
import Game from './components/game.js';
import Home from './components/home.js';

// Connect to server CHANGE TO LOCALHOST FOR FUTURE
const socket = io.connect('https://che55.herokuapp.com/', {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }
  });

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlayingGame: false,
            gameCode: "",
            playerNo: 0,
            errorCode: '',
            gamePlayable: false,
            playerTurn: false,
            winner: '',
        };

        this.newGame = this.newGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
        this.playerJoin = this.playerJoin.bind(this);
        this.winner = this.winner.bind(this);
    }

    // initialize listeners here instead of constructor
    componentDidMount() {

        // Set up listeners
        socket.on("gamecode", (code) => {
            this.setState({gameCode: code })
        });

        //listens for event that lobby is full/invite link is wrong
        socket.on("code", (code) => {
            this.setState({errorCode: code})
        })

        socket.on("gamePlayable", (bool) => {
            this.setState({gamePlayable: bool})
        })
        //players event confirms game join, attaches player number to client state
        socket.on('players', this.playerJoin)

        //toggles between white and black turn by inverted turn bool
        socket.on('toggleTurn', () => {
            this.setState({playerTurn: !this.state.playerTurn})
        })
        
        //listens for winner event
        socket.on('winner', this.winner)
    }

    //sets playernumber and initial player turn
    playerJoin(player) {
        console.log("Player joined");
        this.setState({
            playerNo: player,
            isPlayingGame: true,
        })
        if (player == 1) {
            this.setState({
                playerTurn: true
            })
        }
    }

    winner(winner) {
        console.log("Winner determined");
        let winner_string;
        if (winner.toString() === this.state.playerNo.toString()) {
            winner_string = "You win!";
        } else {
            winner_string = "You lose!";
        }
        this.setState({
            gamePlayable: false,
            winner: winner_string
        })
    }

    makeMove() {
        console.log("Made move");
        socket.emit('playerMove', 'hello');
    }

    // Start a new game and generate a room code.
    newGame() {
        console.log("Starting new game");
        socket.emit('newGame');
    }

    // Join an existing game.
    joinGame(code) {
        console.log("Joining game");
        socket.emit('joinGame', code);
    }

    // Quit current game.
    quitGame() {
        this.setState({
            isPlayingGame: false,
            gameCode: "",
            playerNo: 0,
            errorCode: '',
            gamePlayable: false,
            playerTurn: false,
            winner: '',
        });
        socket.emit('playerQuit');
    }

    // Get either the homepage or gamepage, depending on state
    getCurrentPage() {
        if (this.state.isPlayingGame) {
            return <Game state={this.state} makeMove={this.makeMove} quitGame={this.quitGame} socket={socket} />;
        } else {
            return <Home errorCode={this.state.errorCode} onNewGame={this.newGame} onJoinGame={this.joinGame} />;
        }
    }

    render () {
        return (
            this.getCurrentPage()
        );
    }
}