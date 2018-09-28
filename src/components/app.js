import React, { Component } from 'react';
import TimerDisplay from './timer-display';

export default class App extends Component {
    render() {
        return(
            <TimerDisplay time="300000"></TimerDisplay>
        );
    }
}