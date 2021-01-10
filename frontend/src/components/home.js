import React from 'react';
import logo from "../img/che55.png";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''}

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Handle change in text box.
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    // Handle submitting text box / joining game with code.
    handleSubmit(event) {
        event.preventDefault();
        this.props.onJoinGame(this.state.value);
    }

    render() {
        return (
            <div>
                <div className="logo" id="home">
                    <img src={logo} alt="che55" />
                </div>
                <h1>Main Menu</h1>
                <form onSubmit={this.handleSubmit}>
                    <div style={{ textAlign: 'center' }}>
                        <label>
                            <p>Room code:</p>
                            <p>{this.props.errorCode}</p>
                            <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="Join" />
                    </div>
                </form>
                <br></br>
                <div style={{ textAlign: 'center' }}>
                    <button onClick={this.props.onNewGame}>
                        <div style={{ fontSize: '130%' }}>
                           <p>New game</p> 
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}