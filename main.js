'use strict';

const characterSize = 200;
const pokemon_count = 14;
const roket_count = 9;
const game_duration = 20;
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const playBtn = document.querySelector('.play');
const timer = document.querySelector('.time');
const score = document.querySelector('.score');
const popUp = document.querySelector('.pop__up');
const refresh = document.querySelector('.refresh');
const popUpMsg = document.querySelector('.msg');

const pikachuSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bugSound = new Audio('./sound/bug_pull.mp3');
const bgSound = new Audio('./sound/bg.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');
let started = false;
let score_point = 0;
let time = undefined;

field.addEventListener('click', onFieldClick);

playBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        playBtn.classList.add('stop');
        startGame();
    }
    playBtn.style.transform = `translateY(0px)`
});
refresh.addEventListener('click', ()=>{
    startGame();
    hidePopUp();
});
function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    hideLogo();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hidePlayBtn();
    showPopUp('REPLAY❓');
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win){
    started = false;
    hidePlayBtn();
    if(win){
        playSound(gameWinSound);
    }else{
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    showPopUp(win ? '✨YOU WIN🥳': '😥YOU LOSE💦');
}

function hidePlayBtn(){
    playBtn.style.visibility= 'hidden';
}

function showStopBtn() {
    const icon = playBtn.querySelector('.fas');
        icon.classList.add('fa-pause');
        icon.classList.remove('fa-play');
        playBtn.style.visibility= 'visible';
}

function showTimerAndScore() {
    timer.style.visibility = 'visible';
    score.style.visibility = 'visible';
}
function startGameTimer(){
    let remainingTimeSec = game_duration;
    updateTimerText(remainingTimeSec);
    time = setInterval(()=>{
        if (remainingTimeSec <= 0){
            finishGame(pokemon_count === score_point);
            clearInterval(time);
            
            return;
        }
        updateTimerText(--remainingTimeSec);
    },1000);
}
function stopGameTimer(){
    clearInterval(time);
}
function updateTimerText(t){
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    timer.innerText = `${minutes} : ${seconds}`;
}

function hideLogo() {
    const logo = document.querySelector('.logo');
    logo.style.display = 'none';
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - characterSize;
    const y2 = 355 - characterSize;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const X = randomNumber(x1, x2);
        const Y = randomNumber(y1, y2);
        item.style.left = `${X}px`;
        item.style.top = `${Y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
     return Math.random() * (max - min) + min;
}
function showPopUp(text){
    popUpMsg.innerText = text;
    popUp.classList.remove('hide');
}
function hidePopUp(){
    popUp.classList.add('hide');
}
function initGame() {
    score_point = 0;
    field.innerHTML = '';
    score.innerText = pokemon_count;
    addItem('pikachu', pokemon_count / 7, 'image/pikachu.png');
    addItem('kkobugi', pokemon_count / 7, 'image/kkobugi.png');
    addItem('metamong', pokemon_count / 7, 'image/metamong.png');
    addItem('mew', pokemon_count / 7, 'image/mew.png');
    addItem('evey', pokemon_count / 7, 'image/evey.png');
    addItem('pairi', pokemon_count / 7, 'image/pairi.png');
    addItem('seed', pokemon_count / 7, 'image/seed.png');
    addItem('naong', roket_count / 3, 'image/naong.png');
    addItem('roi', roket_count / 3, 'image/roi.png');
    addItem('rosa', roket_count / 3, 'image/rosa.png');
}
function onFieldClick(e){
    if(!started){
        return;
    }
    const target = e.target;
    if(target.matches('.pikachu') || target.matches('.kkobugi') || target.matches('.metamong') || target.matches('.mew')
    || target.matches('.pairi') || target.matches('.evey') || target.matches('.seed')){
        target.remove();
        score_point++;
        playSound(pikachuSound);
        updateScoreBoard();
        if(score_point === pokemon_count){
            finishGame(true);
        }
    }else if(target.matches('.naong')|| target.matches('.roi') || target.matches('.rosa') ){
        
        finishGame(false);
    }
}
function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}
function stopSound(sound){
    sound.pause();
}
function updateScoreBoard(){
    score.innerText = pokemon_count - score_point;
}
function mouseFun(e) {
    const mouse = document.querySelector('.mouse');
    const x = e.clientX;
    const y = e.clientY;

    
    mouse.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
    
}
document.addEventListener("mousemove", mouseFun);
