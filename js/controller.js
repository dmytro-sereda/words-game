'use strict';

import { async } from 'regenerator-runtime';
import * as model from './model.js';
import {
  SUCCESS_MESSAGE,
  SUCCESS_COLOR,
  FAIL_MESSAGE_INCORRECT,
  FAIL_MESSAGE_REPEAT,
  FAIL_COLOR,
  LOSE_MESSAGE,
  FAIL_COLOR_WHITE,
  TRIES,
  TIMER_START,
  TIMER_MESSAGE,
} from './config.js';
import modalView from './view/modalView.js';
import gameView from './view/gameView.js';
import decorationsView from './view/decorations.js';

function controlPopup() {
  modalView.closePopup();
  modalView.closeOverlay();
}

async function controlSubmit() {
  try {
    if (model.state.tries !== 0 && gameView.getWord()) {
      if (
        gameView.getWord().length > 2 &&
        gameView.getWord().charAt(0) === gameView.getLetter() &&
        !model.state.wordsSubmitted.some(word => word === gameView.getWord()) &&
        (await model.searchTheWord(gameView.getWord()))
      ) {
        // 1) Update the score
        gameView.updateScore();

        // 2) Render the message and update color
        gameView.updateMessage(SUCCESS_MESSAGE);
        gameView.changeMessageColor(SUCCESS_COLOR);

        // 3) Update the letter
        gameView.updateLetter();

        // 4) Change circles' colors
        decorationsView.changeColor(SUCCESS_COLOR);

        // 5) Push the word to the state array
        model.state.wordsSubmitted.push(gameView.getWord());

        // 6) Clear the inputs
        gameView.clearInputs();

        // 7) Update timer
        gameView.updateTimer(TIMER_START);

        // 8) Kill any active timers
        model.state.currentTimerID
          ? window.clearInterval(model.state.currentTimerID)
          : '';

        // 9) Start timer
        model.state.currentTimerID = timer(TIMER_START);
      } else {
        // 1) Update message
        model.state.wordsSubmitted.some(word => word === gameView.getWord())
          ? gameView.updateMessage(FAIL_MESSAGE_REPEAT)
          : gameView.updateMessage(FAIL_MESSAGE_INCORRECT);

        // 2) Change color
        decorationsView.changeColor(FAIL_COLOR);
        gameView.changeMessageColor(FAIL_COLOR);

        // 3) Decrease tries
        model.state.tries--;
        gameView.updateTries(model.state.tries);

        // 4) Clear the inputs
        gameView.clearInputs();

        // 5) Update timer
        gameView.updateTimer(TIMER_START);

        // 6) Kill any active timers
        model.state.currentTimerID
          ? window.clearInterval(model.state.currentTimerID)
          : '';

        // 7) Start timer
        model.state.currentTimerID = timer(TIMER_START);
      }
    }

    if (model.state.tries === 0) {
      // 1) Update message
      gameView.updateMessage(LOSE_MESSAGE);

      // 2) Change style
      decorationsView.changeBackground(FAIL_COLOR);
      decorationsView.changeColor(FAIL_COLOR_WHITE);
      gameView.changeTextColor(FAIL_COLOR_WHITE);

      // 3) Change the button
      gameView.substituteButtonsLose();
      gameView.changeMessageColor(FAIL_COLOR_WHITE);

      // 4) Kill any active timers
      model.state.currentTimerID
        ? window.clearInterval(model.state.currentTimerID)
        : '';
    }
  } catch (err) {
    throw err;
  }
}

function controlRetry() {
  // 1) Update tries
  model.state.tries = TRIES;

  // 2) Call init
  gameView.init();

  // 3) Change buttons
  gameView.substituteButtonsRetry();

  // 4) Clear inputs
  gameView.clearInputs();
}

/////////////////////
function controlTimer() {
  // Start timer
}

function timer(i) {
  const intervalID = window.setInterval(() => {
    if (i === 0) {
      // 1) Finish interval
      clearInterval(intervalID);

      // 2) Update message
      gameView.updateMessage(TIMER_MESSAGE);

      // 3) Update tries
      model.state.tries--;
      gameView.updateTries(model.state.tries);

      // 4) Update styles
      decorationsView.changeColor(FAIL_COLOR);
      gameView.changeMessageColor(FAIL_COLOR);

      // 5) Update timer
      gameView.updateTimer(TIMER_START);

      // 6) Clear inputs
      gameView.clearInputs();

      return;
    }

    i--;
    // 1) Update interface
    gameView.updateTimer(i);
  }, 1000);

  return intervalID;
}

function init() {
  modalView.addHandlerClose(controlPopup);
  gameView.addHandlerSubmit(controlSubmit);
  gameView.addHandlerRetry(controlRetry);
  gameView.init();
}
init();

// model.getTheWord('submarine');
