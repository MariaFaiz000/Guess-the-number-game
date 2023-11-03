let randomNum;
let attempts = 5;
let attemptsLeft = attempts;
let gameOver = false;
let score = 0; // Initialize the score to 0

document.getElementById("difficulty").addEventListener("change", enableInput);

// Remove the input event listener
// document.getElementById("guessInput").addEventListener("input", validateInput);

// Add a submit button element and an event listener for the submit button
const submitButton = document.getElementById("submitButton");
submitButton.addEventListener("click", function(event) {
  checkGuess(event);
});

function generateRandomNumber(difficulty) {
  let min, max;
  let levelMessage = document.getElementById("levelMessage");
  if (difficulty === 'easy') {
    min = 1;
    max = 10;
    levelMessage.innerText = "Selected Level: Easy: Please guess a number between 1-10";
  } else if (difficulty === 'medium') {
    min = 1;
    max = 50;
    levelMessage.innerText = "Selected Level: Medium: Please guess a number between 1-50";
  } else if (difficulty === 'hard') {
    min = 1;
    max = 100;
    levelMessage.innerText = "Selected Level: Hard: Please guess a number between 1-100";
  }
  randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  attemptsLeft = attempts;
}

function enableInput() {
  let difficultySelect = document.getElementById("difficulty");
  let guessInput = document.getElementById("guessInput");
  let errorText = document.getElementById("errorText");

  if (difficultySelect.value === "easy") {
    guessInput.disabled = false;
    guessInput.min = 1;
    guessInput.max = 10;
    errorText.innerText = "";
  } else if (difficultySelect.value === "medium") {
    guessInput.disabled = false;
    guessInput.min = 1;
    guessInput.max = 50;
    errorText.innerText = "";
  } else if (difficultySelect.value === "hard") {
    guessInput.disabled = false;
    guessInput.min = 1;
    guessInput.max = 100;
    errorText.innerText = "";
  } else {
    guessInput.disabled = true;
    errorText.innerText = "";
  }
}

function validateInput() {
  const guessInput = document.getElementById("guessInput");
  const difficultySelect = document.getElementById("difficulty");
  const guess = parseInt(guessInput.value);
  const submitButton = document.querySelector('button[type="submit"]');
  let errorText = document.getElementById("errorText");

  if (difficultySelect.value === "easy" && (isNaN(guess) || guess < 1 || guess > 10)) {
    submitButton.disabled = true;
    errorText.innerText = "Please enter a number between 1 and 10.";
  } else if (difficultySelect.value === "medium" && (isNaN(guess) || guess < 1 || guess > 50)) {
    submitButton.disabled = true;
    errorText.innerText = "Please enter a number between 1 and 50.";
  } else if (difficultySelect.value === "hard" && (isNaN(guess) || guess < 1 || guess > 100)) {
    submitButton.disabled = true;
    errorText.innerText = "Please enter a number between 1 and 100.";
  } else {
    submitButton.disabled = false;
    errorText.innerText = "";
  }
}

function calculateScore(attempts) {
  if (attempts === 1) {
    return 5;
  } else if (attempts === 2) {
    return 4;
  } else if (attempts === 3) {
    return 3;
  } else if (attempts === 4) {
    return 2;
  } else if (attempts === 5) {
    return 1;
  } else {
    return 0;
  }
}

function checkGuess(event) {
  event.preventDefault();
  let guess = document.getElementById("guessInput").value;
  let message = document.getElementById("feedback");

  if (guess === "") {
    message.innerText = "Please enter a valid number";
  } else if (attemptsLeft > 0 && !gameOver) {
    attemptsLeft--;
    if (guess == randomNum) {
      message.innerText = "Congratulations! You guessed the number: " + guess;
      gameOver = true;
      document.getElementById("guessInput").disabled = true;

      // Calculate and display the score
      score = calculateScore(attemptsLeft);
      document.getElementById("score").textContent = "Score: " + score;
    } else {
      if (guess > randomNum) {
        message.innerText = "Too high, please guess again!";
      } else {
        message.innerText = "Too low, please guess again!";
      }
      document.getElementById("attempts").textContent = `Attempts left: ${attemptsLeft}`;
    }
  }

  if (attemptsLeft === 0 && !gameOver) {
    message.textContent = `Sorry, you've run out of attempts. The correct number was ${randomNum}.`;
    gameOver = true;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("score").textContent = "Score: 0";
  }

  if (gameOver) {
    document.getElementById("congratulations").textContent = "Congratulations! You won the game!";
  }

  document.getElementById("guessInput").value = "";
}

document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
document.getElementById("score").textContent = "Score: 0";

document.getElementById("playAgain").addEventListener("click", playAgain);

document.getElementById("playAgain").addEventListener("click", playAgain);

function playAgain() {
  generateRandomNumber(document.getElementById("difficulty").value);
  enableInput();
  document.getElementById("gameForm").reset();
  document.getElementById("guessInput").disabled = false;
  document.getElementById("levelMessage").style.display = "block";
  document.getElementById("attempts").style.display = "block";
  document.getElementById("score").style.display = "block";
  document.getElementById("gameForm").style.display = "block";
  document.getElementById("congratulations").style.display = "none";
  document.getElementById("playAgain").style.display = "none";
  attemptsLeft = attempts;
  document.getElementById("attempts").textContent = `Attempts left: ${attempts}`;
  document.getElementById("score").textContent = "Score: 0";
  gameOver = false;
}
