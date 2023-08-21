let startTime;
let interval;
let running = false;
const lapTimes = [];

function startStop() {
    if (!running) {
        startTime = Date.now() - (lapTimes.length > 0 ? lapTimes.reduce((a, b) => a + b, 0) : 0);
        interval = setInterval(updateTime, 10);
        document.querySelector('button[onclick="startStop()"]').textContent = 'Pause';
        running = true;
    } else {
        clearInterval(interval);
        document.querySelector('button[onclick="startStop()"]').textContent = 'Resume';
        running = false;
    }
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;
    document.getElementById('stopwatch').textContent = `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds, 3)}`;
}

function lap() {
    if (running) {
        const currentTime = Date.now() - startTime;
        lapTimes.push(currentTime);
        updateLapTimes();
    }
}

function reset() {
    clearInterval(interval);
    running = false;
    startTime = null;
    lapTimes.length = 0;
    document.getElementById('stopwatch').textContent = '00:00.000';
    document.getElementById('lap-times').textContent = '';
    document.querySelector('button[onclick="startStop()"]').textContent = 'Start';
}

function updateLapTimes() {
    const lapTimesDisplay = lapTimes.map((lapTime, index) => `${index + 1}. ${formatTime(lapTime)}`).join('<br>');
    document.getElementById('lap-times').innerHTML = lapTimesDisplay;
}

function padNumber(number, length = 2) {
    return String(number).padStart(length, '0');
}

function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const millisecondsFormatted = padNumber(milliseconds % 1000, 3);
    return `${padNumber(minutes)}:${padNumber(seconds)}.${millisecondsFormatted}`;
}