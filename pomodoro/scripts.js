let timer;
let minutes = 25;
let seconds = 0;
let tabTitle = document.getElementById('title');
let repetition = 0;

function startTimer() {
  timer = setInterval(updateTimer, 1000);
  document.querySelector('.start').classList.add('start-hide');
  document.querySelector('.pause').classList.add('pause-display');
}

function stopTimer() {
  clearInterval(timer);
  document.querySelector('.start').classList.remove('start-hide');
  document.querySelector('.pause').classList.remove('pause-display');
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    stopTimer();
    alert("Czas minął!");
    repetition++;
    if(repetition<3){
      shortBreak();
    }else{
      longBreak();
    }
  } else {
    if (seconds === 0) {
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const timeDisplay = `${formattedMinutes}:${formattedSeconds}`;

    document.querySelector('.timer').innerText = timeDisplay;
    document.getElementById('title').innerHTML = timeDisplay + ' - Time to focus!';
  }
}

function shortBreak(){
    document.querySelector('.main-icon').href = "images/check-green.png";
    document.querySelector('.pomo').classList.remove('set-pomo');
    document.querySelector('.long').classList.remove('set-long');
    document.querySelector('.short').classList.add('set-short');

    document.getElementById('body').classList.remove('pomo-body');
    document.getElementById('body').classList.remove('long-body');
    document.getElementById('body').classList.add('short-body');
}

function longBreak(){
  document.querySelector('.main-icon').href = "images/check-blue.png";
  document.querySelector('.pomo').classList.remove('set-pomo');
  document.querySelector('.long').classList.add('set-long');
  document.querySelector('.short').classList.remove('set-short');

  document.getElementById('body').classList.remove('pomo-body');
  document.getElementById('body').classList.add('long-body');
  document.getElementById('body').classList.remove('short-body');
}

function pomodoro(){
    document.querySelector('.main-icon').href = "images/check-red.png";
    document.querySelector('.pomo').classList.add('set-pomo');
    document.querySelector('.long').classList.remove('set-long');
    document.querySelector('.short').classList.remove('set-short');

    document.getElementById('body').classList.add('pomo-body');
    document.getElementById('body').classList.remove('long-body');
    document.getElementById('body').classList.remove('short-body');
}
