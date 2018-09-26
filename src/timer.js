export default class Timer {
    constructor(time) {
        this._totalTime = isNaN(time) || time < 0 ? 0 : time;
        this._timeStarted = null;
    }

    get timeLeft() {
        let elapsedTime = 0;
        if (this._timeStarted) elapsedTime = Date.now() - this._timeStarted;
        return Math.max(this._totalTime - elapsedTime, 0);
    }

    start() {
        this._timeStarted = Date.now();
    }
}