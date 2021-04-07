/* global require */
import dayjs from 'dayjs';
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const getEventDuration = (eventDuration) => {
  let timeCount = '';
  const days = eventDuration.get('day');
  const hours = eventDuration.get('hour');
  const minutes = eventDuration.get('minute');

  if (days) {
    timeCount += days + 'D ';
  }
  if (hours) {
    timeCount += hours + 'H ';
  }
  if (minutes) {
    timeCount += minutes + 'M';
  }

  return timeCount;
};

const getOfferItems = (offers) => {
  const offerList = offers.reduce((offerElements, offer) => {
    return offerElements += `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
    `;
  }, '');

  return offerList;
};

export const createNewPoint = (point) => {
  const eventStart = point.dates.from;
  const eventEnd = point.dates.to;
  const eventMonthDay = dayjs(eventStart).format('MMM DD').toUpperCase();
  const eventYearMonthDay = dayjs(eventStart).format('YYYY-MM-DD');
  const eventYearMonthDayHourMinuteStart = dayjs(eventStart).format('YYYY-MM-DDTHH:mm');
  const eventHourMinuteStart = dayjs(eventStart).format('HH:mm');
  const eventYearMonthDayHourMinuteEnd = dayjs(eventEnd).format('YYYY-MM-DDTHH:mm');
  const eventHourMinuteEnd = dayjs(eventEnd).format('HH:mm');
  const eventStartEndDiff = dayjs.duration(eventEnd.diff(eventStart));

  const favorite = point.isFavorite ? 'event__favorite-btn--active' : '';
  const eventPrice = point.basicPrice;
  const type = point.eventType.type;
  const additionalOffers = getOfferItems(point.eventType.offers);
  const eventTitle = point.eventType.type + point.name;

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime=${eventYearMonthDay}>${eventMonthDay}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${eventTitle}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${eventYearMonthDayHourMinuteStart}>${eventHourMinuteStart}</time>
          &mdash;
          <time class="event__end-time" datetime=${eventYearMonthDayHourMinuteEnd}>${eventHourMinuteEnd}</time>
        </p>
        <p class="event__duration">${getEventDuration(eventStartEndDiff)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${eventPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${additionalOffers}
      </ul>
      <button class="event__favorite-btn ${favorite}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
