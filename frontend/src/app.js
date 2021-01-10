import React from 'react';
import io from 'socket.io-client';
import Game from './components/game.js';
import Home from './components/home.js';
const utils = require('./utils.js');

// Connect to server
const socket = io.connect('http://localhost:4000/');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlayingGame: false,
            gameCode: "",
            playerNo: 0
        };

        // Set up listeners
        socket.on("gamecode", (code) => {
            this.setState({gameCode: code })
        });
        socket.on("playerMove", (move) => {

        });

        this.newGame = this.newGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
    }

    // Start a new game and generate a room code.
    newGame() {
        socket.emit('newGame');
        socket.emit('players', 1);
        this.setState({
            isPlayingGame: true,
            playerNo: 1
        })
    }

    // Join an existing game.
    joinGame(code) {
        socket.emit('joinGame', code);
        socket.emit('players', 2);
        this.setState({
            isPlayingGame: true,
            gameCode: code,
            playerNo: 2
        })
    }

    // Quit current game.
    quitGame() {
        this.setState({
            isPlayingGame: false
        })
        console.log("Quit game.");
    }

    // Get either the homepage or gamepage, depending on state
    getCurrentPage() {
        if (this.state.isPlayingGame) {
            return <Game gameCode={this.state.gameCode} quitGame={this.quitGame} socket={socket} />;
        } else {
            return <Home onNewGame={this.newGame} onJoinGame={this.joinGame} />;
        }
    }

    render () {
        return (
            <div>
                <header>
                    <h1>che55</h1>
                </header>
                {this.getCurrentPage()}
            </div>
        );
    }
}