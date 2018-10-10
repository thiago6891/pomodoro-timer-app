import React, { Component } from 'react';
import TimerDisplay from './timer-display';
import Timer from '../models/timer';
import Time from '../models/time';

const REFRESH_RATE = 1000 / 30; // 30 fps
const POMODORO_TIME = 25 * 60 * 1000; // 25 minutes in milliseconds
const SHORT_BREAK = 5 * 60 * 1000; // 5 minutes in milliseconds
const LONG_BREAK = 15 * 60 * 1000; // 15 minutes in milliseconds

export default class App extends Component {
    constructor(props) {
        super(props);

        this._intervalId = null;

        this.state = {
            timerRunning: false,
            timeLeft: new Time(0)
        };
    }

    startPomodoro() {
        this.startTimer(POMODORO_TIME);
    }

    startShortBreak() {
        this.startTimer(SHORT_BREAK);
    }

    startLongBreak() {
        this.startTimer(LONG_BREAK);
    }

    startTimer(time) {
        if (this._intervalId === null) {
            this._timer = new Timer(time);
            this._timer.start();
            this._intervalId = setInterval(() => 
                this.updateState(),
                REFRESH_RATE);
            this.setState({timerRunning: true});
        }
    }

    stopTimer() {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = null;
            this._timer = null;
            this.setState({timerRunning: false});
        }
    }

    updateState() {
        let timeLeft = this._timer.timeLeft;
        if (timeLeft === 0) this.stopTimer();
        this.setState({timeLeft: new Time(timeLeft)});
    }

    render() {
        return(
            <div>
                <TimerDisplay time={this.state.timeLeft} />
                {this.state.timerRunning ? (
                    <button onClick={() => this.stopTimer()}>Stop</button>
                ) : (
                    <div>
                        <button onClick={() => this.startPomodoro()}>Start Pomodoro</button>
                        <button onClick={() => this.startShortBreak()}>Start Short Break</button>
                        <button onClick={() => this.startLongBreak()}>Start Long Break</button>
                    </div>
                )}
            </div>
        );
    }
}