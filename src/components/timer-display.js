import React, { Component } from 'react';
import Time from '../models/time';

export default class TimerDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeLeft: isNaN(this.props.timeLeft) ? new Time(0) : this.props.timeLeft,
            totalTime: isNaN(this.props.totalTime) ? new Time(0) : this.props.totalTime
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.timeLeft !== null && this.props.timeLeft !== prevProps.timeLeft) {
            this.setState({timeLeft: this.props.timeLeft});
        }

        if (this.props.totalTime !== null && this.props.totalTime !== prevProps.totalTime) {
            this.setState({totalTime: this.props.totalTime});
        }
    }

    formatNumber(n, digits) {
        return ('0'.repeat(digits) + n).slice(-digits);
    }

    render() {
        let minutes = this.formatNumber(this.state.timeLeft.minutes, 2);
        let seconds = this.formatNumber(this.state.timeLeft.seconds, 2);

        let progress = 100 * this.state.timeLeft.total / this.state.totalTime.total;
        if (this.state.totalTime.total === 0) progress = 100;

        return(
            <div className="col">
                <div className="row justify-content-center mt-5">
                    <span className="display-1 font-weight-bold">{minutes}:{seconds}</span>
                </div>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{width: progress + '%'}}
                        aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        );
    }
}
