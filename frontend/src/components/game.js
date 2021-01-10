import React, { useState } from 'react';
import "../game.scss";
import Chessboard from "chessboardjsx";
import { ChessInstance } from "chess.js";
const Chess = require("chess.js");

export default class Game extends React.Component {

    chess() {
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    }

    render () {
        return (
            <div className="flex-center">
                <h1>game.js</h1>
                <button onClick={this.props.quitGame}>
                    <p>Quit game</p>
                </button>
                <Chessboard
                    position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                />
            </div>
        );
    }
}