const board = document.getElementById("board");
const startBtn = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const model = document.querySelector(".modal");
const gameStart = document.querySelector(".start-game");
const gameOver = document.querySelector(".game-over");

const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");

const blockHeight = 40;
const blockWidth = 40;
let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let timer = `00:00`;

highScoreDisplay.textContent = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timerIntervalId = null;

let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
const blocks = [];
let snake = [ {
    x: 4, y:8
}, {
    x:4, y: 9
}, {
    x: 4, y: 10
}]
let direction = "left";

for (let row = 0; row < rows; row++){
    for (let col = 0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[ `${row}-${col}`] = block;
    }
}

function render(){
    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add("food");

    if (direction === "left"){
        head = { x: snake[0].x, y: snake[0].y - 1};
    } else if (direction === "right"){
        head = { x: snake[0].x, y: snake[0].y + 1};
    } else if (direction === "up"){
        head = { x: snake[0].x - 1, y: snake[0].y};
    } else if (direction === "down"){
        head = { x: snake[0].x + 1, y: snake[0].y};
    }
    
    // wall logic
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
        
       clearInterval(intervalId);

       model.style.display = "flex";
       gameStart.style.display = "none";
       gameOver.style.display = "flex";
       return;
    }
    
    // food logic
    if (head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");

        snake.unshift(head);

        score += 10;
        scoreDisplay.textContent = score;

        if (score > highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
    }


    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("snake");
    });

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.add("snake");
    })

}

startBtn.addEventListener("click", () => {
    model.style.display = "none";
    intervalId = setInterval(() => {render()}, 300);
   timerIntervalId = setInterval(() => {
    let [mins, secs] = timer.split(":").map(Number);

    secs++;

    if (secs === 60) {
        mins++;
        secs = 0;
    }

    let formattedSecs = secs < 10 ? "0" + secs : secs;

    timer = `${mins}:${formattedSecs}`;
    timerDisplay.textContent = timer;

}, 1000);
});

resetButton.addEventListener("click", resetGame);

function resetGame() {

    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("snake");
    });
    score = 0;
    timer = `00:00`;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    highScoreDisplay.textContent = highScore;

    model.style.display = "none";
    snake = [ {
        x: 4, y:8
    }, { x:4, y: 9
    }, { x: 4, y: 10
    }]
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

    intervalId = setInterval(() => {render()}, 300);

}

addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft"){
        direction = "left"; 
    } else if (event.key === "ArrowRight"){
        direction = "right"; 
    } else if (event.key === "ArrowUp"){
        direction = "up"; 
    } else if (event.key === "ArrowDown"){
        direction = "down"; 
    }
});