'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// DICE
const diceEl = document.querySelector('.dice');

// BUTTONS
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, activePlayer, currentScore, playing;

const init = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;

  for (let i = 1; i >= 0; i--) {
    activePlayer = i;
    console.log(i);
    setCurrentScore(0);
    setScorePlayer(0);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
  }

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const setCurrentScore = function (value) {
  document.getElementById(`current--${activePlayer}`).textContent = value;
};

const setScorePlayer = function (value) {
  document.getElementById(`score--${activePlayer}`).textContent = value;
};

const switchPlayer = function () {
  setCurrentScore(0);
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
init();
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.- Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2.- Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.- Check for rolled 1: if true, switch to next player and curent Score set 0
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      setCurrentScore(currentScore);
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// Holding Score Functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.- Add current score to active player's score
    scores[activePlayer] += currentScore;
    setScorePlayer(scores[activePlayer]);
    // 2.- Check if player's score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      // 3.- Switch to next player
      switchPlayer();
    }
  }
});

// Set New Game
btnNew.addEventListener('click', init);
