import {turnTemplateIntoElement} from '../util/util.js';

const createTravelList = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

export class TravelListView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTravelList();
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
