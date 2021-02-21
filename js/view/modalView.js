import { Z_INDEX } from '../config.js';

class View {
  _parentElement = document.querySelector('.message');
  _closeBtn = document.querySelector('.closeBtn');
  _overlay = document.querySelector('.overlay');

  addHandlerClose(handler) {
    this._closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handler();
    });
  }

  closePopup() {
    this._parentElement.classList.add('hidden');
    this._parentElement.style.zIndex = Z_INDEX;
  }

  closeOverlay() {
    this._overlay.classList.add('hidden');
    this._overlay.style.zIndex = Z_INDEX;
  }
}

export default new View();
