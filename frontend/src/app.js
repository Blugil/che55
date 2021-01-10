import React from 'react';
import Home from './components/home.js';
import Game from './components/game.js';
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
    render () {
        return (
            <Router>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/game">
                    <Game />
                </Route>
            </Router>
        );
    }
}