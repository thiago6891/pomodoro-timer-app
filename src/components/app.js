import React, { Component } from 'react';
import TimerDisplay from './timer-display';

const DEFAULT_TIME = 300000; // 5 minutes in milliseconds

export default class App extends Component {
    render() {
        return(
            <TimerDisplay time={DEFAULT_TIME}></TimerDisplay>
        );
    }
}