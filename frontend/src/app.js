import React from 'react';
import Home from './components/home.js';
import Game from './components/game.js';
import Login from './components/login.js';
import Logout from './components/logout.js';
const utils = require('./utils.js');

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPlayingGame: false,
            gameCode: ""
        };

        this.newGame = this.newGame.bind(this);
        this.joinGame = this.joinGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
    }

    // Start a new game and generate a room code.
    newGame() {
        var newCode = utils.generateID(6);
        this.setState({
            isPlayingGame: true,
            gameCode: newCode
        })
        console.log("Started game with code " + newCode);
    }

    // Join an existing game.
    joinGame(code) {
        this.setState({
            isPlayingGame: true,
            gameCode: code
        })
        console.log("Joined game with code " + code);
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
            return <Game quitGame={this.quitGame} />;
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