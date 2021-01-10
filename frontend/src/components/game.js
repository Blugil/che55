import Chessboard from "chessboardjsx";
import React from 'react';
import "../game.scss";
import logo from "../img/che55.png";
const Chess = require("chess.js");

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game: new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
            fen: "start",
            dropSquareStyle: {},
            pieceSquare: "",
            square: "",
            history: [],
            gameOver: ""
        };

        this.onDrop = this.onDrop.bind(this);
        this.makeMove = this.makeMove.bind(this);
    }

    componentDidMount() {
        //starts a listener on component mount that listens for moves 
        this.props.socket.on("playerMove", this.makeMove);
    }

    // Receive a move from the server
    makeMove = (receivedMove) => {


        let move = this.state.game.move(receivedMove);

        //double checks for valid move (even though its already checked)
        if (move === null) return;

        // Update game state
        this.setState(({ history, pieceSquare }) => ({
            fen: this.state.game.fen(),
            history: this.state.game.history({ verbose: true })
        }));
        //checks after move if game is over
        if (this.state.game.game_over()) {

            let game_over_string = "Player " + this.props.state.playerNo + " wins!!"
            this.setState({
                gameOver: game_over_string
            })
        }
    }

    // React to a player move
    // TODO: Prevent player from moving off-turn
    onDrop = ({ sourceSquare, targetSquare}) => {
        //checks if both player move and both players connected
        if (this.props.state.gamePlayable && this.props.state.playerTurn) {
            let move = this.state.game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q"
            });

            // Illegal move
            if (move === null) return;

            // Update game state
            this.setState(({ history, pieceSquare }) => ({
                fen: this.state.game.fen(),
                history: this.state.game.history({ verbose: true })
            }));
            
            // Use socket to send move
            this.props.socket.emit("playerMove", move);
            
            //checks after move if game is over
            if (this.state.game.game_over()) {
                this.props.socket.emit('gameOver', this.props.state.playerNo);
            }
        }
        else {
            return;
        }
    }

    // TODO: Erase winner text after quitting game
    render () {
        return (
            <div className="flex-center">
                <div className="logo" id="game">
                    <img src={logo} alt="che55" />
                </div>

                <div className="playArea">
                    <Chessboard
                        orientation={this.props.state.playerNo == 2 ? 'black' : 'white'}
                        position={this.state.fen}
                        onDrop={this.onDrop}
                    />
                </div>
                <div className="controls">
                    <h3>Game code: {this.props.state.gameCode}</h3>
                    <button onClick={this.props.quitGame}>
                        <p>Quit game</p>
                    </button>
                    <br></br>
                        <div style={{ color: '#20B2AA' }}>{this.props.state.winner}</div>
                    <br></br>
                </div>
            </div>
        );
    }
}