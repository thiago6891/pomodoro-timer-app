import Timer from './timer';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomTime(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

test('timer counts down time correctly', async () => {
    let totalTime = getRandomTime(0, 25 * 1000);
    let sleepTime = getRandomTime(0, 200);
    let errorMargin = 10;
    let timer = new Timer(totalTime);

    timer.start();
    await sleep(sleepTime);
    
    let timeLeft = timer.timeLeft;
    expect(timeLeft).toBeGreaterThan(totalTime - sleepTime - errorMargin);
    expect(timeLeft).toBeLessThan(totalTime - sleepTime + errorMargin)
});

test('timer has to be explicitly started', async () => {
    let totalTime = getRandomTime(0, 25 * 1000);
    let sleepTime = getRandomTime(0, 200);
    let timer = new Timer(totalTime);

    await sleep(sleepTime);
    
    expect(timer.timeLeft).toBe(totalTime);
});

test('timer stops at zero', async () => {
    let totalTime = getRandomTime(0, 100);
    let sleepTime = getRandomTime(150, 200);
    let timer = new Timer(totalTime);

    timer.start();
    await sleep(sleepTime);
    
    expect(timer.timeLeft).toBe(0);
});