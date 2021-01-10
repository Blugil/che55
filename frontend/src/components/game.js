import React, { useState } from 'react';
import "./app.scss";
import Chessboard from "chessboardjsx";
import { ChessInstance } from "chess.js";
const Chess = require("chess.js");

export default class App extends React.Component {
    chess() {
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    }
    render () {
        return (
            <div className="flex-center">
                <h1>Chess</h1>
                <Chessboard
                    position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                />
            </div>
        );
    }
}