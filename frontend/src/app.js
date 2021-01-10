import React from 'react';
import io from 'socket.io-client';
import Game from './components/game.js';
import Home from './components/home.js';

// Connect to server
const socket = io.connect('http://localhost:4000/');

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
        this.player = this.player.bind(this);
    }

    // initialize listeners here instead of constructor
    componentDidMount() {

        // TODO: clean up, probably put the callback functions in their own separate functions since this is one cluttered constructor
        // Set up listeners
        socket.on("gamecode", (code) => {
            this.setState({gameCode: code })
        });
        //listens for event that lobby is full/invite link is wrong
        socket.on("code", (code) => {
            this.setState({
                errorCode: code
            })
        })

        socket.on("gamePlayable", (bool) => {
            this.setState({
                gamePlayable: bool
            })
            console.log(this.state.gamePlayable);
        })
        //players event confirms game join, attaches player number to client state
        socket.on('players', this.player)

        //toggles between white and black turn by inverted turn bool
        socket.on('toggleTurn', () => {
            this.setState({
                playerTurn: !this.state.playerTurn
            })
            console.log(this.state.playerTurn)
        })

        socket.on('winner', (winner) => {
            let winner_string = "Player " + winner + " wins!!"
            this.setState({
                gamePlayable: false,
                winner: winner_string
            })
        })
    }

    player(player) {

        this.setState({
            playerNo: player,
            isPlayingGame: true,
        })
        if (player == 1) {
            this.setState({
                playerTurn: true
            })
        }
        console.log(player);
    }

    makeMove() {
        socket.emit('playerMove', 'hello');
    }

    // Start a new game and generate a room code.
    newGame() {
        socket.emit('newGame');
    }

    // Join an existing game.
    joinGame(code) {
        socket.emit('joinGame', code);
        
    }

    // Quit current game.
    quitGame() {
        this.setState({
            isPlayingGame: false
        })
        socket.emit('playerQuit');
    }

    // Get either the homepage or gamepage, depending on state
    getCurrentPage() {
        if (this.state.isPlayingGame) {
            return <Game state={this.state} makeMove={this.makeMove} quitGame={this.quitGame} socket={socket} />;
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