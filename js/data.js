import {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArray} from './util.js';

//Creating 10 objects
const avatarIndexMin = 1;
const avatarIndexMax = 8;
const titleList = ['Уютное место для жизни и отдыха', 'Если нужно остановиться на одну ночь', 'Место для вечеринки в шумной компании', 'Идеально для людей в командировке'];
const typesList = ['palace', 'flat', 'house', 'bungalow'];
const checkinList = ['12:00', '13:00', '14:00'];
const checkoutList = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptonList = ['Лучшее предложение', 'Дешево', 'Восторженные отзывы', 'Скидка', 'Раннее бронирование'];
const photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const latCoordinateMin = 35.65000;
const latCoordinateMax = 35.70000;
const lngCoordinateMin = 139.70000;
const lngCoordinateMax = 139.80000;
const latLngCoordinatePrecision = 5;

const createAuthor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(avatarIndexMin, avatarIndexMax) + '.png',
  };
};

const createCoordinates = () => {
  return {
    lat: getRandomFloat(latCoordinateMin, latCoordinateMax, latLngCoordinatePrecision),
    lng: getRandomFloat(lngCoordinateMin, lngCoordinateMax, latLngCoordinatePrecision),
  };
};

const createOffer = (location) => {
  return {
    title: getRandomArrayElement(titleList),
    address: location.lat + ' ' + location.lng,
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
    location: randCoordinates,
    offer: createOffer(randCoordinates),
  };
};

const createPlacesList = (num = 10) => {
  let testPlacesList = new Array(num).fill(null).map(() => createPlace());
  return testPlacesList;
};

export {createPlacesList};
