'use strict'

//Utils
const getRandomFloat = (min = 0, max = 10000, roundConst = 0) => {
  if (min >= max || roundConst < 0 || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  roundConst = Math.ceil(roundConst);
  return (Math.random() * (max - min) + min).toFixed(roundConst);
};

const getRandomInt = (min = 0, max = 10000) => {
  if (min >= max || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    let shufflerIndex = getRandomInt(0, array.length - 1);
    let swap = array[i];
    array[i] = array[shufflerIndex];
    array[shufflerIndex] = swap;
  }
  return array;
};

const getRandomArray = (refArray) => {
  let resultLength = getRandomInt(1, refArray.length - 1);
  let resultArray = new Array(resultLength).fill(null);
  refArray = shuffleArray(refArray);
  for (let i = 0; i < resultLength; i++) {
    resultArray [i] = refArray [i];
  }
  return resultArray;
};

//Creating 10 objects
const avatarIndexMin = 1;
const avatarIndexMax = 8;
const titleList = ['place to live', 'one-night stay', 'place for a party', 'ideal for business trip'];
const typesList = ['palace', 'flat', 'house', 'bungalow'];
const checkinList = ['12:00', '13:00', '14:00'];
const checkoutList = ['12:00', '13:00', '14:00'];
const featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptonList = ['best offer', 'cheap', 'best rating', 'discount', 'early bird'];
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
  rooms: getRandomInt(1),
  guests: getRandomInt(1),
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

let testPlacesList = new Array(10).fill(null).map(() => createPlace());
