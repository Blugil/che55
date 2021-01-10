import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance } from "chess.js";
const Chess = require("chess.js");

const Home : React.FC = () => {

    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    return (
        <div>
            <h1>home.tsx</h1>
            <Chessboard
                width={400}
                position="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
            />
        </div>
    );
}

export default Home;