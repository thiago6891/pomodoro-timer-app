import React, { Component } from 'react';
import Timer from '../models/timer';
import Time from '../models/time';

const REFRESH_RATE = 1000 / 30; // 30 fps

export default class TimerDisplay extends Component {
    constructor(props) {
        super(props);

        this._timer = props.time === null || isNaN(props.time) ?
            new Timer(0) : new Timer(props.time);
        
        this.state = {timeLeft: new Time(this._timer.timeLeft)};
        
        this._intervalId = setInterval(() => this.updateState(), REFRESH_RATE);
        this._timer.start();
    }

    updateState() {
        let timeLeft = this._timer.timeLeft;
        if (timeLeft === 0) clearInterval(this._intervalId);
        this.setState({timeLeft: new Time(timeLeft)});
    }

    formatNumber(n, digits) {
        return ('0'.repeat(digits) + n).slice(-digits);
    }

    render() {
        let minutes = this.formatNumber(this.state.timeLeft.minutes, 2);
        let seconds = this.formatNumber(this.state.timeLeft.seconds, 2);
        let ms = this.formatNumber(this.state.timeLeft.milliseconds, 3);
        return(
            <div>{minutes}:{seconds}.{ms}</div>
        );
    }
}
