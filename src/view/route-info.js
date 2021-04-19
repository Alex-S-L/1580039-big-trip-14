/* global require */
import AbstractView from './abstract.js';

const dayjs = require('dayjs');

const getTravelPoints = (points) => {
  const travelPoints = [points[0].name];
  for (let i = 1; i < points.length; i++) {
    if (points[i].name !== points[i-1].name) {
      travelPoints.push(points[i].name);
    }
  }

  return travelPoints;
};

const createRouteInfoTemplate = (points) => {
  const travelStart = points[0].dates.from;
  const travelEnd = points[points.length - 1].dates.to;
  const travelStartDate = dayjs(travelStart).format('MMM DD').toUpperCase();
  const travelEndDate = travelStart.isSame(travelEnd, 'month') ? travelEnd.format('DD') : travelEnd.format('MMM DD');

  const travelPoints = getTravelPoints(points);
  const travelPointsResult = travelPoints.reduce((accumulator, name) => {
    return accumulator + ' - ' + name;
  });

  const overallPrice = points.reduce((counter, {basicPrice, eventType: {offers}}) => {
    const offersSum = offers.reduce((sum, {price}) => {
      return sum + price;
    }, 0);
    return counter + basicPrice + offersSum;
  }, 0);

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${travelPointsResult}</h1>

      <p class="trip-info__dates">${travelStartDate}&nbsp;&mdash;&nbsp;${travelEndDate}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${overallPrice}</span>
    </p>
  </section>`;
};

export default class RouteInfo extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createRouteInfoTemplate(this._points);
  }
}
