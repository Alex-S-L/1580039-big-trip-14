/* global require */
import {getRandomInteger} from '../../util/util.js';

const dayjs = require('dayjs');
const badMutable = require('dayjs/plugin/badMutable');
dayjs.extend(badMutable);

const ROUTE_EVENT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESCRIPTION_SENTENSES_MAX_COUNT = 5;
const OFFERS_MAX_COUNT = 5;
const destinationPicturesMaxCount = 10;
const destinations = ['Paris', 'Amsterdam', 'Chamonix', 'Geneva', 'Moscow'];
const descriptionLites = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'];
const offerTitleTamplate = 'Loremipsum';
const date = dayjs();
const dayIndent = 3;
const EventTimings = {
  gapMin: 10,
  gapMax: 30,
  durationMin: 30,
  durationMax: 240,
};

const getRandomDescription = (lines) => {
  const sentenseCount = getRandomInteger(1, DESCRIPTION_SENTENSES_MAX_COUNT);
  let randomDescription = '';

  for (let i = 0; i < sentenseCount; i++) {
    randomDescription += lines[getRandomInteger(0, lines.length - 1)];
  }

  return randomDescription;
};

const getRandomPictures = () => {
  const pictures = [];
  const picturesCount = getRandomInteger(1, destinationPicturesMaxCount);

  for (let i = 0; i < picturesCount; i++) {
    pictures.push({
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1, 100)}`,
      alt: 'some random description',
    });
  }

  return pictures;
};

const getOffers = () => {
  const offers = [];
  const offersCount = getRandomInteger(0, OFFERS_MAX_COUNT - 1);

  for (let i = 0; i < offersCount; i++) {
    offers.push({
      price: getRandomInteger(1, 200),
      title: offerTitleTamplate.substring(0, getRandomInteger(1, offerTitleTamplate.length - 1)),
    });
  }

  return offers;
};

const getRouteAdds = () => {
  return {
    type: ROUTE_EVENT_TYPES[getRandomInteger(0, ROUTE_EVENT_TYPES.length - 1)],
    offers: getOffers(),
  };
};

const setTimer = () => {
  const timer = date.subtract(dayIndent, 'day').clone();

  return function() {
    const eventGap = getRandomInteger(EventTimings.gapMin, EventTimings.gapMax);
    const eventDuration = getRandomInteger(EventTimings.durationMin, EventTimings.durationMax);
    timer.add(eventGap, 'minute');
    const from = timer.clone();
    timer.add(eventDuration, 'minute');
    const to = timer.clone();

    return {
      from: from,
      to: to,
    };
  };
};
const getDates = setTimer();

export const getRoutePointDescription = () => {
  return {
    name: destinations[getRandomInteger(0, destinations.length - 1)],
    description: getRandomDescription(descriptionLites),
    pictures: getRandomPictures(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    eventType: getRouteAdds(),
    basicPrice: getRandomInteger(10, 1000),
    dates: getDates(),
  };
};
