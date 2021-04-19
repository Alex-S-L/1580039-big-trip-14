import {turnTemplateIntoElement} from '../util/render.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Abstract object can\'t be created' );
    }
    this._callback = {};
    this._element = null;
  }

  getTemplate() {
    throw new Error('Abstract metod not emplemented: getTemplate');
  }

  getElement() {
    if(!this._element) {
      this._element = turnTemplateIntoElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
