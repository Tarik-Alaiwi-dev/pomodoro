//get placeholders
let timer = document.querySelector(".timer");
let title = document.getElementById("title");

let startingTime = 25*60;

let pause = 0;

function odliczanie(){
    let minuty = Math.floor(startingTime/60);
    let seconds = startingTime%60;

    timer.innerHTML = minuty + ':' + (seconds<10 ? '0' : '') + seconds;
    title.innerHTML = minuty + ':' + (seconds<10 ? '0' : '') + seconds + " - Time to focus!";

    if(startingTime === 0 || pause === 1){
        clearInterval(odliczanieInterwal);
    }else{
        startingTime--;
    }
}