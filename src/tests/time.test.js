import Time from '../models/time';
import getRandomInt from '../utils/random';

test('time class calculates minutes, seconds, and milliseconds', () => {
    let minutes = getRandomInt(1, 10);
    let seconds = getRandomInt(1, 59)
    let milliseconds = getRandomInt(1, 999);
    let time = new Time((minutes * 60 + seconds) * 1000 + milliseconds);
    
    expect(time.minutes).toBe(minutes);
    expect(time.seconds).toBe(seconds);
    expect(time.milliseconds).toBe(milliseconds);
});