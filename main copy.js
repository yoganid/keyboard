// Sample text data
const data = [
  { text: "The sun was setting behind the mountains, casting a warm glow across the valley." },

  { text: "Load the best score from local storage" },
];

// Initialize game variables
let text = getRandomText().split("");
let hp = Math.floor(text.length / 2);
let damage = 1;
let score = 0;
let gamemode = 0;
let count = 0;
let timer;

// Display initial level
document.getElementById("level").innerHTML = `Level ${damage}`;

// Display initial text
const display = document.getElementById("display");
render(text);

// Event listener for keyboard input
document.querySelector("body").addEventListener("keydown", handleKeyDown);

// Function to handle keyboard input
function handleKeyDown(e) {
  if (gamemode === 0) {
    startGame();
  }

  if (count >= text.length - 1) {
    restartGame();
  } else {
    processKeyInput(e);
  }
}

// Function to render text on display
function render(textArray) {
  display.innerHTML = "";
  textArray.forEach((element) => addElement(element, "text", "text --active"));

  function addElement(element, style) {
    let div = document.getElementById(`display`);
    let p = document.createElement("span");
    p.className = style;
    p.textContent = element;
    div.appendChild(p);
  }
}

// Function to start the game
function startGame() {
  gamemode = 1;
  timer = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
  hp -= damage;

  // Update countdown display based on health points
  updateCountdownDisplay();

  // Check for game over
  if (hp < 0) {
    gameOver();
    clearInterval(timer);
    gamemode = 0;
  }
}

// Function to update countdown display based on health points
function updateCountdownDisplay() {
  let countdownElement = document.getElementById("countdown");

  if (hp < 20) {
    updateCountdownStyle("red");
  } else if (hp >= 20 && hp < 30) {
    updateCountdownStyle("yellow");
  } else {
    updateCountdownStyle("green");
  }

  countdownElement.innerHTML = hp;
}

// Function to update countdown display style
function updateCountdownStyle(color) {
  let countdownElement = document.getElementById("countdown");
  countdownElement.style.color = color;
}

// Function to process key input during the game
function processKeyInput(e) {
  const isCorrectKey = e.key === element[count].innerHTML || e.key === "Shift";

  if (isCorrectKey) {
    element[count].className = "--correct";
    hp += 1;
  } else {
    element[count].className = "--mistake";
    hp -= 1;
  }

  count++;
  element[count].className = "--active";
}

// Function to restart the game
function restartGame() {
  console.log("Game over");
  display.innerHTML = "";
  count = 0;
  text = getRandomText().split("");
  render(text);
  element = document.querySelectorAll(".text");
  score += hp;
  document.getElementById("score").innerHTML = `Your Score: ${score}`;
  hp = Math.floor(text.length / 2);
  damage++;
  document.getElementById("level").innerHTML = `Level ${damage}`;
}

// Function to handle game over
function gameOver() {
  // Check if the current score is the best score
  score > localStorage.getItem("Best Score") ? saveScore() : console.log("Not a new high score!");

  // Display game over message
  display.innerHTML = "Game Over";
  document.getElementById("countdown").innerHTML = "";
}

// Function to save the best score to local storage
function saveScore() {
  localStorage.setItem("Best Score", score);
}

// Function to load and display the best score
function loadBestScore() {
  document.getElementById("bestscore").innerHTML = `Best Score: ${localStorage.getItem("Best Score")}`;
}

// Function to get a random text from the data array
function getRandomText() {
  return data[randomFunction(0, data.length - 1)].text;
}

// Function to generate a random number within a given range
function randomFunction(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load the best score when the page loads
loadBestScore();
