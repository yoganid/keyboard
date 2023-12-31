const data = [
  { text: "The sun was setting behind the mountains, casting a warm glow across the valley." },
  { text: "As the waves crashed against the shore, a lone seagull soared through the vibrant sunset sky." },
  { text: "In the heart of the city, people bustled about their daily lives, immersed in the urban rhythm." },
  { text: "Deep in the enchanted forest, ancient trees whispered secrets to those who listened." },
  { text: "A gentle breeze carried the scent of blooming flowers through the air, creating a sense of tranquility." },
  { text: "High above, a flock of migrating birds painted intricate patterns across the canvas of the open sky." },
  { text: "The old bookstore on the corner exuded an inviting aroma of weathered books and nostalgia." },
  { text: "On the quiet country road, a rusty pickup truck rumbled past fields of golden wheat swaying in the wind." },
  { text: "As night fell, the stars emerged one by one, creating a celestial tapestry overhead." },
  { text: "The aroma of freshly brewed coffee wafted through the cozy cafe, enticing passersby inside." },
  {
    text: "In the bustling market, vendors passionately touted their wares, creating a vibrant tapestry of colors and sounds.",
  },
  { text: "A rainbow arched gracefully across the sky after a brief but restarting summer rain shower." },
  { text: "Lost in thought, the artist carefully blended colors on the canvas, bringing a masterpiece to life." },
  { text: "Amidst the ancient ruins, the echoes of history whispered stories of bygone civilizations." },
  { text: "The laughter of children echoed through the neighborhood as they played in the park." },
  {
    text: "On the mountaintop, the air was crisp and thin, offering breathtaking views of the sprawling landscape below.",
  },
  { text: "The scent of pine filled the air as a hiker traversed the winding trails of the dense forest." },
  {
    text: "In the heart of the desert, the sand dunes stretched endlessly, touched only by the occasional gust of wind.",
  },
  { text: "A lone sailboat glided gracefully across the serene lake, leaving ripples in its wake." },
  {
    text: "The ancient castle stood tall against the backdrop of the dramatic cliff, a silent witness to centuries gone by.",
  },
  { text: "Under the city lights, a couple danced to the rhythm of their own love story in a quiet alleyway." },
  { text: "The aroma of a home-cooked meal filled the kitchen, creating a warm and inviting atmosphere." },
  {
    text: "In the academic library, students immersed themselves in books, surrounded by the hushed whispers of knowledge seekers.",
  },
  {
    text: "The distant sound of thunder heralded an approaching storm, casting a shadow over the peaceful countryside.",
  },
  { text: "A field of wildflowers swayed in the gentle breeze, creating a colorful mosaic beneath the open sky." },
  {
    text: "The sound of a distant waterfall carried through the canyon, beckoning explorers to discover its hidden beauty.",
  },
  { text: "As the city slept, the neon lights of the nightlife district painted the streets in vibrant hues." },
  { text: "The antique clock on the wall ticked steadily, marking the passage of time in the quiet study." },
];

let text = data[randomFunctin(0, data.length - 1)].text.split("");
let hp = Math.floor(text.length / 2);
let damage = 6;
let score = 0;
document.getElementById("level").innerHTML = `Level ${damage}`;
let timer;
let gamemode = 0;
const display = document.getElementById("display");
let count = 0;

function render(e) {
  display.innerHTML = "";
  for (let i = 0; i < e.length; i++) {
    addElement(e[i], "text", "text --active");
  }

  function addElement(element, style) {
    let div = document.getElementById(`display`);
    let p = document.createElement("span");
    p.className = style;
    p.textContent = element;
    div.appendChild(p);
  }
}

render(text);

let element = document.querySelectorAll(".text");
document.querySelector("body").addEventListener("keydown", (e) => {
  // console.log(e.key);
  if (gamemode === 0) {
    timerOnOff();
  }
  if (count >= text.length - 1) {
    restart();
  } else {
    if (e.key === "Shift") {
      console.log("Shift key pressed");
    } else {
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

      renderKeyboard(text, count);
    }
  }
});

function randomFunctin(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function restart() {
  console.log("the and");
  document.getElementById("display").innerHTML = "";
  count = 0;
  text = data[randomFunctin(0, data.length - 1)].text.split("");
  render(text);
  element = document.querySelectorAll(".text");
  score += hp;
  document.getElementById("score").innerHTML = `Your Score: ${score}`;

  hp = Math.floor(text.length / 2);
  if (damage >= 6) {
    console.log("max damage");
  } else {
    damage++;
  }
  document.getElementById("level").innerHTML = `Level ${damage}`;
}

///

function timerOnOff() {
  gamemode = 1;
  timer = setInterval(myTimer, 1000);
}

function myTimer() {
  hp -= damage;

  if (hp < 20) {
    document.getElementById("countdown").style.color = "red";
    document.getElementById("countdown").innerHTML = hp;
  }
  if (hp > 20 && hp < 30) {
    document.getElementById("countdown").style.color = "yellow";
    document.getElementById("countdown").innerHTML = hp;
  }
  if (hp > 30) {
    document.getElementById("countdown").style.color = "green";
    document.getElementById("countdown").innerHTML = hp;
  }
  if (hp <= 0) {
    gameOver();
  }
}

function gameOver() {
  clearTimeout(timer);
  gamemode = 0;
  score > localStorage.getItem("Best Score") ? (save(), load()) : console.log("not winner!");
  document.getElementById("display").innerHTML = "";
  document.getElementById("countdown").innerHTML = "GameOver";
  console.log(gamemode);
  location.reload();
}

function save() {
  localStorage.setItem("Best Score", score);
}

function load() {
  document.getElementById("bestscore").innerHTML = `Best Score: ${localStorage.getItem("Best Score")}`;
}

load();

function renderKeyboard(arr, page) {
  const keys = document.querySelectorAll("[data-key]");
  for (let i = 0; i < keys.length; i++) {
    keys[i].className = "key";
  }
  for (let i = 0; i < keys.length; i++) {
    if (arr[page].toUpperCase() === keys[i].innerHTML) keys[i].className = "key active";
  }
}
