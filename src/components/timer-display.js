import React, { Component } from 'react';
import Time from '../models/time';

export default class TimerDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = isNaN(this.props.time) ? 
            {timeLeft: new Time(0)} : 
            {timeLeft: this.props.time};
    }

    componentDidUpdate(prevProps) {
        if (this.props.time !== null && this.props.time !== prevProps.time) {
            this.setState({timeLeft: this.props.time});
        }
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
