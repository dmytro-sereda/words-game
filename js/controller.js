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

        // 2) Render the message
        gameView.updateMessage(SUCCESS_MESSAGE);

        // 3) Update the letter
        gameView.updateLetter();

        // 4) Change circles' colors
        decorationsView.changeColor(SUCCESS_COLOR);

        // 5) Push the word to the state array
        model.state.wordsSubmitted.push(gameView.getWord());

        // 6) Clear the inputs
        gameView.clearInputs();
      } else {
        // 1) Update message
        model.state.wordsSubmitted.some(word => word === gameView.getWord())
          ? gameView.updateMessage(FAIL_MESSAGE_REPEAT)
          : gameView.updateMessage(FAIL_MESSAGE_INCORRECT);

        // 2) Change color
        decorationsView.changeColor(FAIL_COLOR);

        // 3) Decrease tries
        model.state.tries--;
        gameView.updateTries(model.state.tries);

        // 4) Clear the inputs
        gameView.clearInputs();
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

function init() {
  modalView.addHandlerClose(controlPopup);
  gameView.addHandlerSubmit(controlSubmit);
  gameView.addHandlerRetry(controlRetry);
  gameView.init();
}
init();

// model.getTheWord('submarine');
