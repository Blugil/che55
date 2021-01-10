import React, { useState } from 'react';
import "../game.scss";
import Chessboard from "chessboardjsx";
import { ChessInstance } from "chess.js";
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
    }

    render () {
        return (
            <div className="flex-center">
                <h1>game.js</h1>
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