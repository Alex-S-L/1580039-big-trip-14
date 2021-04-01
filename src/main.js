import {createMenu} from './view/menu.js';
import {createRoutInfo} from './view/rout-info.js';
import {createFilter} from './view/filter.js';
import {createTravelListSorting} from './view/travel-list-sorting.js';
import {createEmptyListMessage} from './view/empty-list-message.js';
import {createTravelList} from './view/travel-list.js';
import {createNewPointForm} from './view/point-adding-form.js';
import {createPointEditingForm} from './view/point-editing-form.js';
import {createNewPoint} from './view/new-point.js';

const POINTS_LIST_ITEMS_COUNT = 3;

const tripMeta = document.querySelector('.trip-main');
const menu = tripMeta.querySelector('.trip-controls__navigation');
const filter = tripMeta.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const renderTemplate = (container, template, position = 'beforeend') => {
  container.insertAdjacentHTML(position, template);
};

renderTemplate(tripMeta, createRoutInfo(), 'afterbegin');
renderTemplate(menu, createMenu());
renderTemplate(filter, createFilter());
renderTemplate(tripEvents, createTravelListSorting(), 'afterbegin');
renderTemplate(tripEvents, createEmptyListMessage());
renderTemplate(tripEvents, createTravelList());

const travelList = tripEvents.querySelector('.trip-events__list');

renderTemplate(travelList, createPointEditingForm(), 'afterbegin');
renderTemplate(travelList, createNewPointForm());
for(let i = 0; i < POINTS_LIST_ITEMS_COUNT; i++) {
  renderTemplate(travelList, createNewPoint());
}
