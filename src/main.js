import {renderElement, replaceElements} from './util/render.js';

import RouteInfoView from './view/route-info.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
import TravelListSortingView from './view/travel-list-sorting.js';
import EmptyListMessageView from './view/empty-list-message.js';
import TravelListView from './view/travel-list.js';
import RoutePointView from './view/route-point.js';
// import AddingFormView from './view/point-adding-form.js';
import EditingFormView from './view/point-editing-form.js';
// import {FormView} from './view/point-edditing-and-adding-form.js';

import {getRoutePointDescription} from './model/mock/route-point.js';

const POINTS_LIST_ITEMS_COUNT = 10;
const routePoints = new Array(POINTS_LIST_ITEMS_COUNT).fill().map(getRoutePointDescription);
const pageHeader = document.querySelector('.page-header');
const headerMainInformation = pageHeader.querySelector('.trip-main');
const headerMenu = pageHeader.querySelector('.trip-controls__navigation');
const headerFilter = pageHeader.querySelector('.trip-controls__filters');
const travelContainer = document.querySelector('.trip-events');

const renderHeader = () => {
  renderElement(headerMainInformation, new RouteInfoView(routePoints), 'begin');
  renderElement(headerMenu, new MenuView(), 'end');
  renderElement(headerFilter, new FilterView(), 'end');
};

const renderTravelPoints = (travelListElement, travelPoint) => {
  const routePoint = new RoutePointView(travelPoint);
  const routePointEditForm = new EditingFormView(travelPoint);

  const editFormOnSubmit = () => {
    replaceElements(routePoint, routePointEditForm);
    routePointEditForm.removeAllListeners();
  };

  const switchEditFormToPoint = (evt) => {
    if (evt.keyCode === 27) {
      replaceElements(routePoint, routePointEditForm);
      routePointEditForm.removeAllListeners();
      return;
    }
    replaceElements(routePoint, routePointEditForm);
    routePointEditForm.removeAllListeners();
  };

  routePoint.setRollupButtonClickHandler(() => {
    replaceElements(routePointEditForm, routePoint);
    routePointEditForm.setDocumentKeyDownHandler(switchEditFormToPoint);
    routePointEditForm.setRollupButtonClickHandler(switchEditFormToPoint);
    routePointEditForm.setFormSubmitHandler(editFormOnSubmit);
  });

  renderElement(travelListElement, routePoint.getElement(), 'end');
};


const renderBoard = (travelBoard, travelPoints) => {
  if (travelPoints.length === 0) {
    renderElement(travelBoard, new EmptyListMessageView(), 'end');
  }

  const listSorting = new TravelListSortingView();
  const travelList = new TravelListView();

  renderElement(travelBoard, listSorting, 'end');
  renderElement(travelBoard, travelList, 'end');

  travelPoints.forEach((travelPoint) => {
    renderTravelPoints(travelList, travelPoint);
  });
};

renderHeader();
renderBoard(travelContainer, routePoints);
