let scoreBox = document.getElementById("scoreBox");
let skipBox = document.getElementById("skipBox");
let timerBox = document.getElementById("timerBox");
let gameArea = document.getElementById("gameArea");
let startBtn = document.getElementById("start");

let score = 0;
let skip = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

// Create Bubbles
function createBubbles() {
  if (gameArea.querySelectorAll(".bubbles").length >= 4) return;

  const bubble = document.createElement("div");
  bubble.classList.add("bubbles");

  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  bubble.textContent = letter;


  const x = Math.random() * (gameArea.offsetWidth - 55);
  bubble.style.left = x + "px";

  gameArea.appendChild(bubble);

  bubble.addEventListener("touchstart", () => {
    bubble.remove();
    score++;
    scoreBox.textContent = score;
  });

  // Bubble timeout (skip count)
  setTimeout(() => {
    if (bubble.parentElement) {
      bubble.remove();
      skip++;
      skipBox.textContent = skip;
    }
  }, 5000);
}

// Start Game
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  gameArea.style.display = "block";

  score = 0;
  skip = 0;
  scoreBox.textContent = score;
  skipBox.textContent = skip;
  timerBox.textContent = "00:30";

  gameInterval = setInterval(createBubbles, 500);

  timerInterval = setInterval(() => {
    timeLeft--;

    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    timerBox.textContent = `${mins}:${secs}`;

    if (timeLeft <= 0) {
      endGame();
    }
}, 1000);
});

// Handle Key Press
document.addEventListener("keydown", (e) => {
  const bubbles = document.querySelectorAll(".bubbles");
  for (let bubble of bubbles) {
    if (bubble.textContent.toLowerCase() === e.key.toLowerCase()) {
      bubble.remove();
      score++;
      scoreBox.textContent = score;
      break;
    }
  }
});

function exitGame() {
  gameArea.innerHTML = `
    <div class="exit-screen">
      <h2>Do you want to exit the game?</h2>
      <button onclick="confirmExit()">Yes</button>
      <button onclick="location.reload()">No</button>
    </div>
  `;
}

function confirmExit() {
  gameArea.innerHTML = `
    <div class="exit-screen">
      <h2>Thank you for playing</h2>
      <p>Game exited successfully.</p>
    </div>
  `;
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  gameArea.innerHTML = `
    <div class="game-over">
      <h2> Game Over</h2>
      <p> Final Score: <span>${score}</span></p>
      <p>Skipped: <span>${skip}</span></p>
      <button onclick="location.reload()">Restart</button>
      <button onclick="exitGame()">Exit</button>
    </div>
  `;
 
}


