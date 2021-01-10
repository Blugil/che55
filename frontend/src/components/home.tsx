import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
const Chess = require("chess.js");

const Home : React.FC = () => {

    // Create a chess.js object to generate legal moves
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [fen, setFen] = useState(chess.fen());

    // Handle a player move
    const handleMove = (move: ShortMove) => {
        if (chess.move(move)) {
            setTimeout(() => {
                // Get random move from computer
                const moves = chess.moves();
                if (moves.length > 0) {
                    const computerMove = moves[Math.floor(Math.random() * moves.length)];
                    chess.move(computerMove);
                    setFen(chess.fen());
                }
            }, 300);

            setFen(chess.fen());
        }
    }

    // Return HTML to be injected by DOM
    return (
        <div>
            <h1>home.tsx</h1>
            <Chessboard
                width={400}
                position={fen}
                onDrop={(move) =>
                    handleMove({
                        from: move.sourceSquare,
                        to: move.targetSquare,
                        promotion: "q",
                    })
                }
            />
        </div>
    );
}

export default Home;