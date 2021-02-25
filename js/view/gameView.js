import icon from 'url:../../img/heart.svg';
import decorationsView from './decorations.js';
import {
  INIT_BACKGROUND_COLOR,
  INIT_CIRCLES_COLOR,
  INIT_TEXT_COLOR,
} from '../config.js';

class GameView {
  _parentElement = document.querySelector('.game__container');
  _submitBtn = document.querySelector('.submit-btn');
  _retryBtn = document.querySelector('.retry-btn');
  _message = document.querySelector('.game-message');
  _score = document.querySelector('.game-score');
  _letter = document.querySelector('.letter');
  _input = document.querySelector('.game-input');
  _triesContainer = document.querySelector('.tries__container');
  _logo = document.querySelector('.title');
  _footer = document.querySelector('.footer');

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerRetry(handler) {
    this._retryBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  getWord() {
    return this._input.value.toLowerCase();
  }

  getLastLetter() {
    return this.getWord().trim().slice(-1);
  }

  getLetter() {
    return this._letter.textContent.toLowerCase();
  }

  updateScore(score = true) {
    if (score) this._score.textContent++;
    if (!score) this._score.textContent = score;
  }

  updateMessage(message) {
    this._message.textContent = message;
  }

  updateLetter() {
    this._letter.textContent = this.getLastLetter().toUpperCase();
  }

  updateTries(tries) {
    this._triesContainer.innerHTML = '';
    let markup = ``;
    for (let i = tries; i > 0; i--) {
      markup += `<img src="${icon}" alt="heart" class="heart" />`;
    }
    this._triesContainer.insertAdjacentHTML('afterbegin', markup);
  }

  clearInputs() {
    this._input.value = '';
  }

  changeTextColor(color) {
    this._input.style.borderBottom = `2px solid #${color}`;
    this._parentElement.style.color = this._footer.style.color = this._logo.style.color = this._input.style.color = `#${color}`;
  }

  substituteButtonsLose() {
    this._submitBtn.classList.add('hidden');
    this._retryBtn.classList.remove('hidden');
    this._submitBtn.style.zIndex = 0;
    this._retryBtn.style.zIndex = 1;
    this._retryBtn.style.display = 'block';
    this._submitBtn.style.display = 'none';
  }

  substituteButtonsRetry() {
    this._submitBtn.classList.remove('hidden');
    this._retryBtn.classList.add('hidden');
    this._submitBtn.style.zIndex = 1;
    this._retryBtn.style.zIndex = -1;
    this._submitBtn.style.display = 'block';
    this._retryBtn.style.display = 'none';
  }

  init() {
    this.updateScore(0);
    this.updateMessage('Type the first word');
    this.updateTries(3);
    decorationsView.changeColor(INIT_CIRCLES_COLOR);
    decorationsView.changeBackground(INIT_BACKGROUND_COLOR);
    this.changeTextColor(INIT_TEXT_COLOR);
  }
}

export default new GameView();
