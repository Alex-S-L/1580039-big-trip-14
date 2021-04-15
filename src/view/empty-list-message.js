import {turnTemplateIntoElement} from '../util/util.js';

const createEmptyListMessage = () => {
  return `<p class="trip-events__msg">
    Click New Event to create your first point</p>`;
};

export class EmptyListMessageView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyListMessage();
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
