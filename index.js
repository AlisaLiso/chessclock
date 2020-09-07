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

const changeTime = (newTime, container) => {
  const time = newTime * 60;
  container.innerHTML = `${Math.floor(time / 60)}:${time % 60}0`;
  return time;
};

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
            const newTime = changeTime(parseInt(value), whiteTimeContainer);
            whiteTime = newTime;
            whiteStartMinutes = newTime / 60;
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
            const newTime = changeTime(parseInt(value), blackTimeContainer);
            blackTime = newTime;
            blackStartMinutes = newTime / 60;
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
  if (!isGameStartredForWhite) {
    updateWhiteClock();
    isGameStartredForWhite = true;
  }
  whiteInterval = setInterval(updateWhiteClock, delay);
  isWhiteClockStarted = true;
}

function startGameForBlack() {
  if (!isGameStartredForBlack) {
    updateBlackClock();
    isGameStartredForBlack = true;
  }
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
    hideGameMenu();
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
    hideGameMenu();
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
  changeTime(blackStartMinutes, blackTimeContainer);
  changeTime(whiteStartMinutes, whiteTimeContainer);
  restart.style.display = "none";
  isRestartVisible = false;

  showGameMenu();
});
