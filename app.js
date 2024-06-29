let gameSeq = [];
let playerseq = [];
let start = false;
let level = 0;
let colors = ["yellow","green","red","blue"];
let highest = 0;
const GameOver = new Audio("./Audio/gameover.wav");
const sounds = {
    blue: new Audio("./Audio/blue.mp3"),
    green: new Audio("./Audio/green.mp3"),
    red: new Audio("./Audio/red.mp3"),
    yellow: new Audio("./Audio/yellow.mp3")
};


document.addEventListener("keypress", function(){
    if(start == false){
        start = true;
        console.log("Game started");
        levelup();
    }
})

function levelup(){
    playerseq = [];
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${level}`;
    let random_index = Math.floor(Math.random()*4);
    let random_color = colors[random_index];
    gameSeq.push(random_color);
    sounds[random_color].play()
    console.log("Game Sequence", gameSeq);
    let random_btn = document.querySelector(`.${random_color}`);
    buttonFlash(random_btn);
}

function buttonFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },100)
}


let btns = document.querySelectorAll(".btn");
for(btn of btns){
    btn.addEventListener("click", pressed);
}

function pressed(){
    let btn = this;
    let pressed_color = btn.getAttribute("id");
    sounds[pressed_color].play()
    // playSound(pressed_color);
    if(start == true){
        playerseq.push(pressed_color);
        console.log("Player Sequence", playerseq);
        buttonFlash(btn);
        checkAns(playerseq.length-1);
    }
    
}


function checkAns(index){
    if(playerseq[index] === gameSeq[index]){
        if(playerseq.length === gameSeq.length){
            setTimeout(levelup,500);
        }
        console.log("Same Value");
    }
    else{
        let h2 = document.querySelector("h2");
        let body = document.querySelector("body");
        body.classList.add("over");
        setTimeout(function(){
            body.classList.remove("over");
        },250);
        
        GameOver.play();
        let curr_score = level-1;
        highest = Math.max(highest, curr_score);
        let high = document.querySelector("#high");
        high.innerHTML = `Best score - ${highest} <br>Current game score - <b>${level-1}<b>`;
        reset();
    }
}

function reset(){
    start = false;
    playerseq = [];
    gameSeq = [];
    level = 0;
}