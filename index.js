const left = document.querySelector(".white");
const right = document.querySelector(".black");

// TIME
const blackTimeContainer = document.querySelector(".black-time");
const whiteTimeContainer = document.querySelector(".white-time");

// RESTART
const restart = document.querySelector("#restart");
let isRestartVisible = false;
const delay = 1000;

// GAMES
const listGames = document.querySelectorAll("#list-games > .list__item");
const oneMinuteGame = document.querySelector("#one-minute-game");
const fiveMinuteGame = document.querySelector("#five-minute-game");
const tenMinuteGame = document.querySelector("#ten-minute-game");

let startMinutes = 1;
let time = startMinutes * 60;
let isGameStarted = false;

let whiteInterval;
let isWhiteClockStarted = false;
let whiteTime = time;

let blackInterval;
let isBlackClockStarted = false;
let blackTime = time;

const changeTime = (newTime) => {
  startMinutes = newTime;
  time = startMinutes * 60;
  whiteTime = time;
  blackTime = time;
  whiteTimeContainer.innerHTML = `${Math.floor(time / 60)}:${time % 60}0`;
  blackTimeContainer.innerHTML = `${Math.floor(time / 60)}:${time % 60}0`;
};

for (const game of listGames) {
  game.addEventListener("click", function () {
    for (let i = 0; i < listGames.length; i++) {
      if (listGames[i] === this) {
        this.classList.add("list__item--selected");
        changeTime(parseInt(this.innerHTML));
      } else {
        var toggleClass = "list__item list__item--selected";
        if (listGames[i].className == toggleClass) {
          listGames[i].classList.remove("list__item--selected");
        }
      }
    }
  });
}

function toggleClass(element) {
  var toggleClass = "list__item list__item--selected";

  if (element.className == toggleClass) {
    element.classList.remove("list__item--selected");
  } else {
    element.classList.add("list__item--selected");
  }
}

function clearGame() {
  isGameStarted = false;
  clearInterval(whiteInterval);
  clearInterval(blackInterval);
}

function updateWhiteClock() {
  const minutes = Math.floor(whiteTime / 60);
  let seconds = whiteTime % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  whiteTime--;
  whiteTimeContainer.innerHTML = `${minutes}:${seconds}`;

  if (whiteTime < 0) {
    clearGame();
  }
}

function updateBlackClock() {
  const minutes = Math.floor(blackTime / 60);
  let seconds = blackTime % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  blackTime--;
  blackTimeContainer.innerHTML = `${minutes}:${seconds}`;

  if (blackTime < 0) {
    clearGame();
  }
}

function startGameForWhite() {
  updateWhiteClock();
  whiteInterval = setInterval(updateWhiteClock, delay);
  isWhiteClockStarted = true;
}

function startGameForBlack() {
  updateBlackClock();
  blackInterval = setInterval(updateBlackClock, delay);
  isBlackClockStarted = true;
}

function updateClock() {
  if (isWhiteClockStarted) {
    clearInterval(whiteInterval);
    isWhiteClockStarted = false;
    isBlackClockStarted = true;
    startGameForBlack();
  } else if (isBlackClockStarted) {
    clearInterval(blackInterval);
    isWhiteClockStarted = true;
    isBlackClockStarted = false;
    startGameForWhite();
  }
}

left.addEventListener("click", () => {
  if (!isRestartVisible) {
    restart.style.display = "block";
    isRestartVisible = true;
  }

  if (isRestartVisible) {
    for (const game of listGames) {
      game.style.display = "none";
    }
  }

  if (isGameStarted) {
    updateClock();
  } else {
    isGameStarted = true;
    startGameForWhite();
  }
});

right.addEventListener("click", () => {
  if (!isRestartVisible) {
    restart.style.display = "block";
    isRestartVisible = true;
  }

  if (isRestartVisible) {
    for (const game of listGames) {
      game.style.display = "none";
    }
  }

  if (isGameStarted) {
    updateClock();
  } else {
    isGameStarted = true;
    startGameForWhite();
  }
});

restart.addEventListener("click", () => {
  clearGame();
  changeTime(startMinutes);
  restart.style.display = "none";
  isRestartVisible = false;

  for (const game of listGames) {
    game.style.display = "inline-flex";
  }
});
