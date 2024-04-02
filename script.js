const dateDiv = document.querySelector('#date');
const watchDiv = document.querySelector('#watch');
const activateButton = document.querySelector('#activate-button');
const stopButton = document.querySelector('#stop-button');
const alarmHour = document.querySelector('#alarm-hour');
const alarmTime = document.querySelector('#alarm-time');
const timerDiv = document.querySelector('.timer');

const formatDate = () => {
    const date = new Date();
    
    let day = date.getDay();
    day = day < 10 ? '0' + day : day;
    
    let month = (date.getMonth() + 1);
    month = month < 10 ? '0' + month : month;
    
    let year = date.getFullYear();
    
    const formattedDate = day + '/' + month + '/' + year;
    
    dateDiv.innerHTML = formattedDate;
}

const formatHour = (date) => {
    let hour = date.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    
    let minute = date.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    
    let second = date.getSeconds();
    second = second < 10 ? '0' + second : second;
    
    const formattedHour = hour + ':' + minute + ':' + second;
    
    return formattedHour;
}

const timer = (date) => {
    if (alarmActivated && !alarmPlaying) {
        if (date.getTime() >= alarmTimeStamp) {
            alarmAudio.play();
            timerDiv.classList.add('alarm');
            alarmPlaying = true;
        }
    }
}

const watch = () => {
    const date = new Date();

    const formattedHour = formatHour(date);

    watchDiv.innerHTML = formattedHour;

    timer(date);
}

let currentTimeStamp;
let alarmTimeStamp;
let alarmActivated = false;
let alarmPlaying = false;

const alarmAudio = new Audio('assets/alarm-sound.mp3');
alarmAudio.loop = -1;

formatDate();
setInterval(watch, 1000);

activateButton.addEventListener('click', () => {
    currentTimeStamp = Date.now();
    alarmTimeStamp = currentTimeStamp + (alarmTime.value * 1000);

    alarmActivated = true;

    const alarmDate = new Date(alarmTimeStamp);

    const formattedHour = formatHour(alarmDate);

    alarmHour.innerHTML = 'Hora do alarme: ' + formattedHour;
});

stopButton.addEventListener('click', () => {
    alarmHour.innerHTML = 'Hora do alarme: ';

    alarmTime.value = 0;

    alarmActivated = false;
    alarmPlaying = false;

    alarmAudio.pause();
    alarmAudio.currentTime = 0;

    timerDiv.classList.remove('alarm');
});