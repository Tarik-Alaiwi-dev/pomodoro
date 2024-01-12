let timer;
let minutes = 25;
let seconds = 0;
let tabTitle = document.getElementById('title');
let repetition = 0;
let taskList = [
  {
    numOfPomo: 1,
    donePomo: 0,
    name: "halo",
    checked: false
  }
];

console.log(taskList);

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
    minutes = 5;
    seconds = 1;
    document.querySelector('.main-icon').href = "images/check-green.png";
    document.querySelector('.pomo').classList.remove('set-pomo');
    document.querySelector('.long').classList.remove('set-long');
    document.querySelector('.short').classList.add('set-short');

    document.getElementById('body').classList.remove('pomo-body');
    document.getElementById('body').classList.remove('long-body');
    document.getElementById('body').classList.add('short-body');

    document.querySelector('.start').classList.add('start-short');
    document.querySelector('.start').classList.remove('start-long');
    document.querySelector('.start').classList.remove('start-pomo');
    updateTimer();
    stopTimer();
}

function longBreak(){
  minutes = 15;
  seconds = 1;
  document.querySelector('.main-icon').href = "images/check-blue.png";
  document.querySelector('.pomo').classList.remove('set-pomo');
  document.querySelector('.long').classList.add('set-long');
  document.querySelector('.short').classList.remove('set-short');

  document.getElementById('body').classList.remove('pomo-body');
  document.getElementById('body').classList.add('long-body');
  document.getElementById('body').classList.remove('short-body');

  document.querySelector('.start').classList.remove('start-short');
  document.querySelector('.start').classList.add('start-long');
  document.querySelector('.start').classList.remove('start-pomo');
  updateTimer();
  stopTimer();
}

function pomodoro(){
    minutes = 25;
    seconds = 1;
    document.querySelector('.main-icon').href = "images/check-red.png";
    document.querySelector('.pomo').classList.add('set-pomo');
    document.querySelector('.long').classList.remove('set-long');
    document.querySelector('.short').classList.remove('set-short');

    document.getElementById('body').classList.add('pomo-body');
    document.getElementById('body').classList.remove('long-body');
    document.getElementById('body').classList.remove('short-body');

    document.querySelector('.start').classList.remove('start-short');
    document.querySelector('.start').classList.remove('start-long');
    document.querySelector('.start').classList.add('start-pomo');
    updateTimer();
    stopTimer();
}

function addTask(){
  //display properly
  document.querySelector('.add-task').classList.add('add-task-disable');
  document.querySelector('.new-task').classList.add('new-task-enable');

  //set default num of pomo
  document.getElementById('num-of-pomo').value = 1;
}

function cancel(){
  document.querySelector('.add-task').classList.remove('add-task-disable');
  document.querySelector('.new-task').classList.remove('new-task-enable');
}

function save(){
  //add task to taskList
  let newTask = {
    numOfPomo: Number(document.getElementById('num-of-pomo').value),
    donePomo: 0,
    name: document.getElementById('input-task').value,
    checked: false
  };
  taskList.push(newTask);
  console.log(taskList);
  document.querySelector('.add-task').classList.remove('add-task-disable');
  document.querySelector('.new-task').classList.remove('new-task-enable');
  
  updateTasks();
}

function updateTasks(){
  let conteiner = document.querySelector('.task-list');
  console.log(conteiner);

  let newTask = `
    <button class="task">
      <div class="left">
          <i class="fa-solid fa-circle-check"></i>
          <span>${taskList[taskList.length-1].name}</span>
      </div>
      <div class="right">
          <span>${taskList[taskList.length-1].donePomo}/${taskList[taskList.length-1].numOfPomo}</span>
      </div>
    </button>
  `;

  conteiner.innerHTML += newTask;
}