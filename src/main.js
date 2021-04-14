import {renderElement} from './util/util.js';

import {RouteInfoView} from './view/route-info.js';
import {MenuView} from './view/menu.js';
import {FilterView} from './view/filter.js';
import {TravelListSortingView} from './view/travel-list-sorting.js';
import {EmptyListMessageView} from './view/empty-list-message.js';
import {TravelListView} from './view/travel-list.js';
import {RoutePointView} from './view/route-point.js';
// import {AddingFormView} from './view/point-adding-form.js';
import {EditingFormView} from './view/point-editing-form.js';
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
  renderElement(headerMainInformation, new RouteInfoView(routePoints).getElement(), 'begin');
  renderElement(headerMenu, new MenuView().getElement(), 'end');
  renderElement(headerFilter, new FilterView().getElement(), 'end');
};

const renderTravelPoints = (travelListElement, travelPoint) => {
  const routePoint = new RoutePointView(travelPoint);
  const routePointEditForm = new EditingFormView(travelPoint);

  const switchPointToEditForm = () => {
    travelListElement.replaceChild(routePointEditForm.getElement(), routePoint.getElement());
  };

  const switchEditFormPointToPoint = () => {
    travelListElement.replaceChild(routePoint.getElement(), routePointEditForm.getElement());
  };

  const removeEditFormListeners = () => {
    routePointEditForm.getElement().querySelector('.event__rollup-btn').removeEventListener('click', editFormRollupClickHandler);
    routePointEditForm.getElement().querySelector('form').removeEventListener('submit', editFormSubmitHandler);
    document.removeEventListener('keydown', switchToPointOnEsk);
  };

  const editFormSubmitHandler = () => {
    switchEditFormPointToPoint();
    removeEditFormListeners();
  };

  const editFormRollupClickHandler = () => {
    switchEditFormPointToPoint();
    removeEditFormListeners();
  };

  const switchToPointOnEsk = (evt) => {
    if (evt.keyCode === 27) {
      switchEditFormPointToPoint();
    }
  };

  routePoint.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    switchPointToEditForm();
    document.addEventListener('keydown', switchToPointOnEsk);
    routePointEditForm.getElement().querySelector('.event__rollup-btn').addEventListener('click', editFormRollupClickHandler);
    routePointEditForm.getElement().querySelector('form').addEventListener('submit', editFormSubmitHandler);
  });

  renderElement(travelListElement, routePoint.getElement(), 'end');
};


const renderBoard = (travelBoard, travelPoints) => {
  if (travelPoints.length === 0) {
    renderElement(travelBoard, new EmptyListMessageView().getElement(), 'end');
  }

  const listSorting = new TravelListSortingView();
  const travelList = new TravelListView();

  renderElement(travelBoard, listSorting.getElement(), 'end');
  renderElement(travelBoard, travelList.getElement(), 'end');

  travelPoints.forEach((travelPoint) => {
    renderTravelPoints(travelList.getElement(), travelPoint);
  });
};


renderHeader();
renderBoard(travelContainer, routePoints);
