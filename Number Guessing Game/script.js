let checkBtn = document.getElementById("checkBtn");
let guessInput = document.getElementById("guessInput");
let attempts = document.getElementById("attempts");
let message = document.getElementById("message");
let resetBtn = document.getElementById("resetBtn");
let minNum = 1;
let maxNum = 10;
let attemptsLeft = 3;
let randomNumber = generateRandom();

function generateRandom() {
  return Math.floor(Math.random() * maxNum) + minNum;
}

checkBtn.addEventListener("click", () => {
     let userGuess  = Number(guessInput.value);

   
        if (userGuess === randomNumber){
            message.textContent = `${randomNumber} is Correct! You guessed it right!`;
            checkBtn.classList.add("hidden");
            attempts.textContent = "";
            guessInput.disabled = true;
            resetBtn.classList.remove("hidden");
        }
        else{
            attemptsLeft--;
            message.textContent = `❌ Wrong! Try Again`;
            attempts.textContent = `You have ${attemptsLeft} attempts feft`;
        }

        if(attemptsLeft <= 0){
            message.textContent = `😞 Game Over! The correct number was ${randomNumber}.`;
            attempts.textContent = "";
            guessInput.disabled = true;
            checkBtn.disabled = false;

            endGame();
        }

        guessInput.value = "";

});

function endGame() {
    guessInput.disabled = true;
    checkBtn.disabled = true;
    checkBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
}

resetBtn.addEventListener("click", () => {
    randomNumber = generateRandom();
    guessInput.disabled = false;
    checkBtn.disabled = false;
    attemptsLeft = 3;
    checkBtn.classList.remove("hidden");
    resetBtn.classList.add("hidden");
    message.textContent = "";
    guessInput.value = "";
});