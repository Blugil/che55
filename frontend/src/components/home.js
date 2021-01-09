import React from 'react';
import Chessboard from 'chessboardjsx';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>che55</h1>
                <Chessboard position="start"/>
            </div>
        );
    }
}