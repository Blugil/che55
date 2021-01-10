import React from 'react';

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
                <h1>home.js</h1>
                <button onClick={this.props.onNewGame}>
                    <p>New game</p>
                </button>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Room code:</p>
                        <p>{this.props.errorCode}</p>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Join" />
                </form>
            </div>
        );
    }
}