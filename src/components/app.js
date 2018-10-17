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
        this._alarmSound = new Audio('alarm.mp3');

        this.state = {
            timerRunning: false,
            timeLeft: new Time(0),
            totalTime: new Time(0)
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
            this.setState({timerRunning: true, totalTime: new Time(time)});
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
        if (timeLeft === 0) {
            this.stopTimer();
            this._alarmSound.play();
        }
        this.setState({timeLeft: new Time(timeLeft)});
    }

    render() {
        return(
            <div className="container">
                <TimerDisplay timeLeft={this.state.timeLeft} totalTime={this.state.totalTime} />
                {this.state.timerRunning ? (
                    <div className="row justify-content-center">
                        <button type="button" className="btn btn-danger my-1 w-75" 
                            onClick={() => this.stopTimer()}>Stop</button>
                    </div>
                ) : (
                    <div>
                        <div className="row justify-content-center">
                            <button type="button" className="btn btn-primary my-1 w-75" 
                                onClick={() => this.startPomodoro()}>Start Pomodoro</button>
                        </div>
                        <div className="row justify-content-center">
                            <button type="button" className="btn btn-primary my-1 w-75" 
                                onClick={() => this.startShortBreak()}>Start Short Break</button>
                        </div>
                        <div className="row justify-content-center">
                            <button type="button" className="btn btn-primary my-1 w-75" 
                                onClick={() => this.startLongBreak()}>Start Long Break</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}