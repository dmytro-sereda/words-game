class DecorationsView {
  _circles = document.querySelectorAll('.circle');
  _parentElement = document.querySelector('body');

  changeColor(color) {
    this._circles.forEach(circle => (circle.style.background = `#${color}`));
  }

  changeBackground(color) {
    this._parentElement.style.background = `#${color}`;
  }
}

export default new DecorationsView();
