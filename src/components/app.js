import React, { Component } from 'react';
import Timer from '../models/timer';
import Time from '../models/time';

export default class App extends Component {
    constructor(props) {
        super(props);
        this._timer = new Timer(1.5 * 60 * 1000);
        
        this.state = {
            timeLeft: new Time(this._timer.timeLeft)
        };
        
        this._intervalId = setInterval(() => this.updateState(), 1000 / 30);
        this._timer.start();
    }

    updateState() {
        let timeLeft = this._timer.timeLeft;
        if (timeLeft === 0) clearInterval(this._intervalId);
        this.setState({timeLeft: new Time(timeLeft)});
    }

    formatNumber(n) {
        return ('0' + n).slice(-2);
    }

    render() {
        let minutes = this.formatNumber(this.state.timeLeft.minutes);
        let seconds = this.formatNumber(this.state.timeLeft.seconds);
        let milliseconds = this.formatNumber(this.state.timeLeft.milliseconds);
        return(
            <div>{minutes}:{seconds}.{milliseconds}</div>
        );
    }
}