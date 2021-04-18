import AbstractView from './abstract.js';

const createTravelList = () => {
  return `<ul class="trip-events__list">
    </ul>`;
};

export default class TravelListView extends AbstractView {
  getTemplate() {
    return createTravelList();
  }
}
