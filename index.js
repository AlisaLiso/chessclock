// TODO: Add submenu for more game settings for each player

const left = document.querySelector(".white");
const right = document.querySelector(".black");

// TIME
const blackTimeContainer = document.querySelector(".black-time");
const whiteTimeContainer = document.querySelector(".white-time");
const multipleSettings = document.querySelector("#multisettings");
const checkbox = document.querySelector(".checkbox");

const whiteListGames = document.querySelectorAll(
  "#white-list-games > .list__item"
);
const blackListGames = document.querySelectorAll(
  "#black-list-games > .list__item"
);
const listGames = document.querySelectorAll("#list-games > .list__item");

// RESTART
const restart = document.querySelector("#restart");
let isRestartVisible = false;

// GAME SETTINGS FOR EACH PLAYER
let isShowSettingsForEachPlayer = false;

// COMMON GAME SETTINGS
let startGameInitial = 60000;
let endGameInitial = 00000;
let isGameStarted = false;

// WHITE GAME SETTINGS
let initial = 60000;
let count = initial;
let counter, initialMillis;
let isGameStartredForWhite = false;

// BLACK GAME SETTINGS
let initialBlack = 60000;
let counterBlack, initialMlsBlack;
let countBlack = initialBlack;
let isGameStartredForBlack = false;

// FOR WHITE COUNT REMAINING TIME / DISPLAY TIME / SET INITIALS IF TIMER REACHES ZERO
function timerWhite() {
  if (count <= 0) {
    clearInterval(counter);
    count = endGameInitial;
    displayCount(endGameInitial);
    left.removeEventListener("click", startTheGame);
    right.removeEventListener("click", startTheGame);
    return;
  }
  let current = Date.now();

  count = count - (current - initialMillis);
  initialMillis = current;
  displayCount(count);
}

// FOR BLACK COUNT REMAINING TIME / DISPLAY TIME / SET INITIALS IF TIMER REACHES ZERO
function timerBlack() {
  if (countBlack <= 0) {
    clearInterval(counterBlack);
    countBlack = endGameInitial;
    displayCountBlack(endGameInitial);
    left.removeEventListener("click", startTheGame);
    right.removeEventListener("click", startTheGame);
    return;
  }
  let current = Date.now();

  countBlack = countBlack - (current - initialMlsBlack);
  initialMlsBlack = current;
  displayCountBlack(countBlack);
}

// DISPLAY TIME FOR WHITE
function displayCount(count) {
  let res = count / 1000;
  let minutes = Math.floor(res.toPrecision() / 60);
  var sec = Math.floor(res.toPrecision()) % 60;

  whiteTimeContainer.innerHTML = `${minutes > 9 ? minutes : "0" + minutes}:${
    sec > 9 ? sec : "0" + sec
  }`;
}

// DISPLAY TIME FOR BLACK
function displayCountBlack(count) {
  let res = count / 1000;
  let minutes = Math.floor(res.toPrecision() / 60);
  var sec = Math.floor(res.toPrecision()) % 60;

  blackTimeContainer.innerHTML = `${minutes > 9 ? minutes : "0" + minutes}:${
    sec > 9 ? sec : "0" + sec
  }`;
}

// CHANGE IN GAME TIME FOR WHITE AND TOGGLE CLASS FOR SELECTED TIME
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

// CHANGE IN GAME TIME FOR BLACK AND TOGGLE CLASS FOR SELECTED TIME
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

// CHANGE IN GAME TIME FOR BOTH BLACK AND WHITE AND TOGGLE CLASS FOR SELECTED TIME
for (const game of listGames) {
  game.addEventListener("click", function () {
    for (let i = 0; i < listGames.length; i++) {
      if (listGames[i] === this) {
        const value = this.innerHTML.trim();
        this.classList.add("list__item--selected");
        switch (value) {
          case "1":
          case "5":
          case "10":
            initialBlack = parseInt(value) * 60 * 1000;
            displayCountBlack(initialBlack);
            countBlack = initialBlack;
            initial = parseInt(value) * 60 * 1000;
            displayCount(initial);
            count = initial;
            break;

          default:
            console.log(`Sorry, there's no events for ${value}.`);
        }
      } else {
        var toggleClass = "list__item list__item--selected";
        if (listGames[i].className == toggleClass) {
          listGames[i].classList.remove("list__item--selected");
        }
      }
    }
  });
}

// HIDE FOR EACH, BLACK AND WHITE, GAME MENU
const hideGameMenu = () => {
  for (const game of whiteListGames) {
    game.style.display = "none";
  }
  for (const game of blackListGames) {
    game.style.display = "none";
  }
};

// HIDE COMMON GAME MENU
const hideMainGameMenu = () => {
  for (const game of listGames) {
    game.style.display = "none";
  }
};

// SHOW COMMON GAME MENU
const showMainGameMenu = () => {
  for (const game of listGames) {
    game.style.display = "inline-flex";
  }
};

// SHOW FOR EACH, BLACK AND WHITE, GAME MENU
const showGameMenu = () => {
  for (const game of whiteListGames) {
    game.style.display = "inline-flex";
  }
  for (const game of blackListGames) {
    game.style.display = "inline-flex";
  }
};

// SHOW RESTART BUTTON AND HIDE FOR EACH, BLACK AND WHITE, GAME MENU
function toggleRestart() {
  if (!isRestartVisible) {
    restart.style.display = "block";
    isRestartVisible = true;
  }

  if (isRestartVisible) {
    hideGameMenu();
    hideMainGameMenu();
  }
}

// START GAME
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
      counter = setInterval(timerWhite, 10);
    }
  } else {
    hideMainGameMenu();
    checkbox.style.display = "none";
    toggleRestart();
    clearInterval(counter);
    initialMillis = Date.now();
    isGameStarted = true;
    isWhiteClockStarted = true;
    counter = setInterval(timerWhite, 10);
  }
}

// DISPLAY START GAME TIME
function clearGameTimer() {
  displayCount(startGameInitial);
  displayCountBlack(startGameInitial);
}

// SHOW AND HIDE GAME SETTINGS FOR EACH PLAYER
function toggleMultipleSettings() {
  if (!isShowSettingsForEachPlayer) {
    clearGameTimer();
    showGameMenu();
    hideMainGameMenu();
    isShowSettingsForEachPlayer = true;
  } else if (isShowSettingsForEachPlayer) {
    clearGameTimer();
    hideGameMenu();
    showMainGameMenu();
    isShowSettingsForEachPlayer = false;
  }
}

// ON RESTART BUTTON SHOW SELECTED GAME MENU
// CLEAR INTERVALS
// RESET GAME SETTINGS
// HIDE RESTART BUTTON
function handleRestart() {
  if (isShowSettingsForEachPlayer) {
    showGameMenu();
  } else {
    showMainGameMenu();
  }
  clearInterval(counter);
  clearInterval(counterBlack);
  count = initial;
  countBlack = initialBlack;
  displayCount(count);
  displayCountBlack(countBlack);
  restart.style.display = "none";
  isRestartVisible = false;
  isGameStarted = false;

  left.addEventListener("click", startTheGame);
  right.addEventListener("click", startTheGame);
  checkbox.style.display = "inline-flex";
}

// DISPLAY TIME AND HIDE GAME MENU FOR EACH PLAYER
// AT THE START WILL BE WISIBLE ONLY COMMON GAME MENU
displayCount(initial);
displayCountBlack(initialBlack);
hideGameMenu();

left.addEventListener("click", startTheGame);

right.addEventListener("click", startTheGame);

multipleSettings.addEventListener("click", toggleMultipleSettings);

restart.addEventListener("click", handleRestart);
