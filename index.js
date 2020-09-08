// TODO: Add submenu for more game settings for each player
// TODO: Add checkbox for common or separate game settings for each player

const left = document.querySelector(".white");
const right = document.querySelector(".black");

// TIME
const blackTimeContainer = document.querySelector(".black-time");
const whiteTimeContainer = document.querySelector(".white-time");

const whiteListGames = document.querySelectorAll(
  "#white-list-games > .list__item"
);
const blackListGames = document.querySelectorAll(
  "#black-list-games > .list__item"
);

// RESTART
const restart = document.querySelector("#restart");
let isRestartVisible = false;
const delay = 1000;

let initial = 60000;
let initialBlack = 60000;
let count = initial;
let countBlack = initialBlack;
let counter, counterBlack, initialMillis, initialMlsBlack;
let currentPlayer = "white";

function timer() {
  if (count <= 0) {
    clearInterval(counter);
    return;
  }
  let current = Date.now();

  count = count - (current - initialMillis);
  initialMillis = current;
  displayCount(count);
}

function timerBlack() {
  if (countBlack <= 0) {
    clearInterval(counterBlack);
    return;
  }
  let current = Date.now();

  countBlack = countBlack - (current - initialMlsBlack);
  initialMlsBlack = current;
  displayCountBlack(countBlack);
}

function displayCount(count) {
  let res = count / 1000;
  let minutes = Math.floor(res.toPrecision() / 60);
  var sec = Math.floor(res.toPrecision()) % 60;

  whiteTimeContainer.innerHTML = `${minutes > 9 ? minutes : "0" + minutes}:${
    sec > 9 ? sec : sec + "0"
  }`;
}

function displayCountBlack(count) {
  let res = count / 1000;
  let minutes = Math.floor(res.toPrecision() / 60);
  var sec = Math.floor(res.toPrecision()) % 60;

  blackTimeContainer.innerHTML = `${minutes > 9 ? minutes : "0" + minutes}:${
    sec > 9 ? sec : sec + "0"
  }`;
}

let blackStartMinutes = 1;
let whiteStartMinutes = 1;
let time = blackStartMinutes * 60;
let isGameStarted = false;
let isGameStartredForWhite = false;
let isGameStartredForBlack = false;

let whiteInterval;
let isWhiteClockStarted = false;
let whiteTime = whiteStartMinutes * 60;

let blackInterval;
let isBlackClockStarted = false;
let blackTime = blackStartMinutes * 60;

for (const game of whiteListGames) {
  game.addEventListener("click", function () {
    for (let i = 0; i < whiteListGames.length; i++) {
      if (whiteListGames[i] === this) {
        const value = this.innerHTML.trim();
        this.classList.add("list__item--selected");
        switch (value) {
          case "1":
          case "5":
          case "10":
            initial = parseInt(value) * 60 * 1000;
            displayCount(initial);
            count = initial;
            break;

          default:
            console.log(`Sorry, there's no events for ${value}.`);
        }
      } else {
        var toggleClass = "list__item list__item--selected";
        if (whiteListGames[i].className == toggleClass) {
          whiteListGames[i].classList.remove("list__item--selected");
        }
      }
    }
  });
}

for (const game of blackListGames) {
  game.addEventListener("click", function () {
    for (let i = 0; i < blackListGames.length; i++) {
      if (blackListGames[i] === this) {
        const value = this.innerHTML.trim();
        this.classList.add("list__item--selected");
        switch (value) {
          case "1":
          case "5":
          case "10":
            initialBlack = parseInt(value) * 60 * 1000;
            displayCountBlack(initialBlack);
            countBlack = initialBlack;
            break;

          default:
            console.log(`Sorry, there's no events for ${value}.`);
        }
      } else {
        var toggleClass = "list__item list__item--selected";
        if (blackListGames[i].className == toggleClass) {
          blackListGames[i].classList.remove("list__item--selected");
        }
      }
    }
  });
}

const hideGameMenu = () => {
  for (const game of whiteListGames) {
    game.style.display = "none";
  }
  for (const game of blackListGames) {
    game.style.display = "none";
  }
};

const showGameMenu = () => {
  for (const game of whiteListGames) {
    game.style.display = "inline-flex";
  }
  for (const game of blackListGames) {
    game.style.display = "inline-flex";
  }
};

function toggleRestart() {
  if (!isRestartVisible) {
    restart.style.display = "block";
    isRestartVisible = true;
  }

  if (isRestartVisible) {
    hideGameMenu();
  }
}

function startTheGame() {
  if (isGameStarted) {
    if (isWhiteClockStarted) {
      clearInterval(counter);
      isWhiteClockStarted = false;
      isBlackClockStarted = true;
      initialMlsBlack = Date.now();
      counterBlack = setInterval(timerBlack, 10);
    } else if (isBlackClockStarted) {
      clearInterval(counterBlack);
      isWhiteClockStarted = true;
      isBlackClockStarted = false;
      initialMillis = Date.now();
      counter = setInterval(timer, 10);
    }
  } else {
    toggleRestart();
    clearInterval(counter);
    initialMillis = Date.now();
    isGameStarted = true;
    isWhiteClockStarted = true;
    counter = setInterval(timer, 10);
  }
}

displayCount(initial);
displayCountBlack(initialBlack);

left.addEventListener("click", () => {
  startTheGame();
});

right.addEventListener("click", () => {
  startTheGame();
});

restart.addEventListener("click", () => {
  clearInterval(counter);
  count = initial;
  countBlack = initialBlack;
  displayCount(count);
  displayCountBlack(countBlack);
  restart.style.display = "none";
  isRestartVisible = false;

  showGameMenu();
});
