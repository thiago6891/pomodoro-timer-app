export default class Time {
    constructor(ms) {
        this._time = ms;
    }

    get minutes() { return Math.floor((this._time % (1000 * 60 * 60)) / (1000 * 60)) }
    get seconds() { return Math.floor((this._time % (1000 * 60)) / 1000) }
    get milliseconds() { return Math.floor(this._time % 1000) }
}