import "./scss/main.scss";
const asset = require("./static/**.png");

let scores, roundScore, activePlayer, gamePlaying, init;

const dice = document.querySelector(".dice");

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

(init = () => {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  dice.style.display = "none";

  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player - 1";
  document.getElementById("name-1").textContent = "Player - 2";
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
})();

const nextPlayer = () => {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
};

const rollDice = () => {
  const randomDice = Math.floor(Math.random() * 6) + 1;
  dice.style.display = "block";

  if (randomDice !== 1) {
    roundScore += randomDice;
    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
    nextPlayer();
  }

  const imgName = asset[`dice-${randomDice}`];
  dice.src = `${imgName}`;
};

const holdPlay = () => {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 30) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
      console.log(`Player ${activePlayer + 1} won the game`);
      init();
    } else {
      nextPlayer();
    }
  } else {
    init();
  }
};

btnNew.addEventListener("click", init);
btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", holdPlay);
