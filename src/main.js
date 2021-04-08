import {createMenu} from './view/menu.js';
import {createRoutInfo} from './view/rout-info.js';
import {createFilter} from './view/filter.js';
import {createTravelListSorting} from './view/travel-list-sorting.js';
import {createEmptyListMessage} from './view/empty-list-message.js';
import {createTravelList} from './view/travel-list.js';
// import {createNewPointForm} from './view/point-adding-form.js';
// import {createPointEditingForm} from './view/point-editing-form.js';
import {createForm} from './view/point-edditing-and-adding-form.js';
import {createNewPoint} from './view/new-point.js';
import {getRoutePointDescription} from './model/mock/route-point.js';

const POINTS_LIST_ITEMS_COUNT = 13;
const routePoints = new Array(POINTS_LIST_ITEMS_COUNT).fill().map(getRoutePointDescription);
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

renderTemplate(travelList, createForm(routePoints[0], 'edit'), 'afterbegin');
renderTemplate(travelList, createForm(routePoints[0], 'add'));
for(let i = 1; i < POINTS_LIST_ITEMS_COUNT; i++) {
  renderTemplate(travelList, createNewPoint(routePoints[i]));
}
