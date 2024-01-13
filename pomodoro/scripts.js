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
//let temp = localStorage.getItem('taskList');
//taskList = JSON.parse(temp)
let taskId = 0;
let lastSelected;
let state = 0;
let audioBell = new Audio("sounds/bell.mp3");

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

function skip(){
  stopTimer();
  minutes = 0;
  seconds = 1;
  startTimer();
  updateTimer();
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    stopTimer();
    repetition++;
    audioBell.play();
    if(lastSelected != null && state === 0){
      taskList[lastSelected+1].donePomo++;
      console.log(taskList[lastSelected+1].donePomo);
      document.getElementById(`done-pomo-${lastSelected}`).innerHTML = `${taskList[lastSelected+1].donePomo}/${taskList[lastSelected+1].numOfPomo}`;
    }
      if(state===0){
        if(repetition<=3){
          shortBreak();
        }else{
          longBreak();
          repetition=0;
        }
      }else{
        pomodoro();
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
    state = 1;
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

    document.querySelector('.pause').classList.add('pause-short');
    document.querySelector('.pause').classList.remove('pause-long');
    document.querySelector('.pause').classList.remove('pause-pomo');
    updateTimer();
    stopTimer();
}

function longBreak(){
  state = 2;
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

  document.querySelector('.pause').classList.add('pause-short');
  document.querySelector('.pause').classList.remove('pause-long');
  document.querySelector('.pause').classList.remove('pause-pomo');
  updateTimer();
  stopTimer();
}

function pomodoro(){
    state = 0;
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

    document.querySelector('.pause').classList.remove('pause-short');
    document.querySelector('.pause').classList.remove('pause-long');
    document.querySelector('.pause').classList.add('pause-pomo');
    updateTimer();
    stopTimer();
}

function addTask(){
  //display properly
  document.querySelector('.add-task').classList.add('add-task-disable');
  document.querySelector('.new-task').classList.add('new-task-enable');

  //set default num of pomo
  document.getElementById('num-of-pomo').value = 1;

  //focus on input
  document.getElementById('input-task').focus();
}

function cancel(){
  document.querySelector('.add-task').classList.remove('add-task-disable');
  document.querySelector('.new-task').classList.remove('new-task-enable');
}

function save(){
  //add task to taskList
  if(document.getElementById('input-task').value === ''){
    return;
  }
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
  document.getElementById('input-task').value = '';

    //local storage
    //let taskList_serialized = JSON.stringify(taskList);
    //localStorage.setItem("taskList", taskList_serialized);
}

function updateTasks(){
  let conteiner = document.querySelector('.task-list');
  console.log(conteiner);

  let newTask = `
    <button onclick="checkTask(${taskId});" class="task task-${taskId}">
      <div class="left">
          <img class="img img-${taskId}" onclick="crossTask(${taskId});" src="images/check-grey.png">
          <span id="task-name-${taskId}">${taskList[taskList.length-1].name}</span>
      </div>
      <div class="right">
          <span id="done-pomo-${taskId}">${taskList[taskList.length-1].donePomo}/${taskList[taskList.length-1].numOfPomo}</span>
      </div>
    </button>
  `;
  taskId++;

  conteiner.innerHTML += newTask;
}

function checkTask(i){
  if(lastSelected === i){
    return;
  }
  document.querySelector(`.task-${i}`).classList.add('task-selected');
  if(lastSelected != null){
    document.querySelector(`.task-${lastSelected}`).classList.remove('task-selected');
  }
  lastSelected = i;
  document.querySelector('.task-title').innerHTML = taskList[i+1].name;
}

function crossTask(i){
  console.log(taskList[i+1].checked);
  if(taskList[i+1].checked === true){
    taskList[i+1].checked = false;
    document.getElementById(`task-name-${i}`).classList.remove('task-checked');
    document.querySelector(`.img-${i}`).src = "images/check-grey.png";
  }else{
    document.getElementById(`task-name-${i}`).classList.add('task-checked');
    taskList[i+1].checked = true;
    document.querySelector(`.img-${i}`).src = "images/check-red.png";
  }
}

function addPomo(){
  document.getElementById('num-of-pomo').value++;
}

function removePomo(){
  document.getElementById('num-of-pomo').value--;
}