import {turnTemplateIntoElement} from '../util/util.js';

const createMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
  </nav>`;
};

export class MenuView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMenu();
  }

  getElement() {
    if (!this._element) {
      this._element = turnTemplateIntoElement(this.getTemplate());
    }

    return this._element;
  }

  deleteElement() {
    this._element = null;
  }
}
