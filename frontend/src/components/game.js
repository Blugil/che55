import Chessboard from "chessboardjsx";
import React from 'react';
import "../game.scss";
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
            history: []
        };

        this.onDrop = this.onDrop.bind(this);
    }

    // Receive a move from the server
    makeMove = (receivedMove) => {
        this.state.game.move(receivedMove);

        // Update game state
        this.setState(({ history, pieceSquare }) => ({
            fen: this.state.game.fen(),
            history: this.state.game.history({ verbose: true })
        }));
    }

    // React to a player move
    onDrop = ({ sourceSquare, targetSquare}) => {
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
        this.props.socket.emit("playerMove", this.state.fen);
    }

    render () {
        return (
            <div className="flex-center">
                <h1>game.js</h1>
                <h3>Game code: {this.props.gameCode}</h3>
                <button onClick={this.props.quitGame}>
                    <p>Quit game</p>
                </button>
                <Chessboard
                    position={this.state.fen}
                    onDrop={this.onDrop}
                />
            </div>
        );
    }
}