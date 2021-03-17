import {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArray} from './util.js';

//Creating 10 objects
const avatarIndexMin = 1;
const avatarIndexMax = 8;
const titleList = ['Уютное место для жизни', 'Остановиться на одну ночь', 'Место для вечеринки', 'Идеально для командировки'];
const typesList = ['palace', 'flat', 'house', 'bungalow'];
const checkinList = ['12:00', '13:00', '14:00'];
const checkoutList = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptonList = ['Лучшее предложение', 'Дешево', 'Восторженные отзывы', 'Скидка', 'Раннее бронирование'];
const photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const xCoordinateMin = 35.65000;
const xCoordinateMax = 35.70000;
const yCoordinateMin = 139.70000;
const yCoordinateMax = 139.80000;
const xyCoordinatePrecision = 5;

const createAuthor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(avatarIndexMin, avatarIndexMax) + '.png',
  };
};

const createCoordinates = () => {
  return {
    x: getRandomFloat(xCoordinateMin, xCoordinateMax, xyCoordinatePrecision),
    y: getRandomFloat(yCoordinateMin, yCoordinateMax, xyCoordinatePrecision),
  };
};

const createOffer = (coordinates) => {
  return {
    title: getRandomArrayElement(titleList),
    address: coordinates.x + ' ' + coordinates.y,
    price: getRandomInt(),
    type: getRandomArrayElement(typesList),
    rooms: getRandomInt(1, 20),
    guests: getRandomInt(1, 100),
    checkin: getRandomArrayElement(checkinList),
    checkout: getRandomArrayElement(checkoutList),
    features: getRandomArray(featuresList),
    description: getRandomArrayElement(descriptonList),
    photos: getRandomArray(photosList),
  };
};

const createPlace = () => {
  let randCoordinates = createCoordinates();
  return {
    author: createAuthor(),
    coordinates: randCoordinates,
    offer: createOffer(randCoordinates),
  };
};

const createPlacesList = () => {
  let testPlacesList = new Array(10).fill(null).map(() => createPlace());
  return testPlacesList;
};

export {createPlacesList};
