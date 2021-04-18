import AbstractView from './abstract.js';

const createEmptyListMessage = () => {
  return `<p class="trip-events__msg">
    Click New Event to create your first point</p>`;
};

export default class EmptyListMessage extends AbstractView {
  getTemplate() {
    return createEmptyListMessage();
  }
}
