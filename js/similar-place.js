import {
  createPlacesList
} from './data.js';

const getTypeOfPlace = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    default:
      return 'Download Data Error'
  }
};

const getCapacityGuests = (guests) => {
  if (guests % 10 === 1) return guests + ' гостя';
  else return guests + ' гостей';
};

const getCapacityRooms = (rooms) => {
  if (rooms < 20 && rooms > 10) return rooms + ' комнат для ';

  if (rooms % 10 === 1) return rooms + ' комната для ';
  else if (rooms % 10 < 5 && rooms % 10 > 1) return rooms + ' комнаты для ';
  else return rooms + ' комнат для ';
};

const getPhotos = (place, photosData) => {
  const popupPhotos = place.querySelector('.popup__photos');
  const photoTemplate = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(photoTemplate);
  const photoGallery = document.createDocumentFragment();
  photosData.forEach(photoData => {
    let img = photoTemplate.cloneNode(true);
    img.src = photoData;
    photoGallery.appendChild(img);
  });
  return photoGallery;
};

const getFeatures = (place, featuresData) => {
  const features = place.querySelectorAll('.popup__feature');
  const convertFeaturesData = featuresData.map((str) => {
    return 'popup__feature--' + str;
  });
  for (let i = 0; i < features.length; i++) {
    features[i].classList.add('hidden');
  }
  for (let j = 0; j < convertFeaturesData.length; j++) {
    for (let i = 0; i < features.length; i++) {
      if (features[i].classList.contains(convertFeaturesData[j])) {
        features[i].classList.remove('hidden');
      }
    }
  }
};

const fillCard = (place, {
  author,
  offer,
}) => {
  author.avatar ? place.querySelector('.popup__avatar').src = author.avatar : place.querySelector('.popup__avatar').classList.add('hidden');
  offer.title ? place.querySelector('.popup__title').textContent = offer.title : place.querySelector('.popup__title').classList.add('hidden');
  offer.address ? place.querySelector('.popup__text--address').textContent = offer.address : place.querySelector('.popup__text--address').classList.add('hidden');
  offer.price ? place.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь' : place.querySelector('.popup__text--price').classList.add('hidden');
  offer.type ? place.querySelector('.popup__type').textContent = getTypeOfPlace(offer.type) : place.querySelector('.popup__type').classList.add('hidden');
  (offer.rooms != undefined && offer.guests != undefined) ? place.querySelector('.popup__text--capacity').textContent = getCapacityRooms(offer.rooms) + getCapacityGuests(offer.guests): place.querySelector('.popup__text--capacity').classList.add('hidden');
  (offer.checkin && offer.checkout) ? place.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ' выезд до ' + offer.checkout: place.querySelector('.popup__text--time').classList.add('hidden');
  offer.features.length !== 0 ? getFeatures(place, offer.features) : place.querySelector('.popup__features').classList.add('hidden');
  offer.description ? place.querySelector('.popup__description').textContent = offer.description : place.querySelector('.popup__description').classList.add('hidden');
  offer.photos.length !== 0 ? place.querySelector('.popup__photos').appendChild(getPhotos(place, offer.photos)) : place.querySelector('.popup__photos').classList.add('hidden');
};

const getSimilarPlacesList = (similarPlacesCount) => {
  const testPlacesList = createPlacesList();
  const similarPlaceTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarPlaces = document.createDocumentFragment();
  for (let i = 0; i < similarPlacesCount; i++) {
    const similarPlace = similarPlaceTemplate.cloneNode(true);
    fillCard(similarPlace, testPlacesList[i]);
    similarPlaces.appendChild(similarPlace);
  }
  return similarPlaces;
};

const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(getSimilarPlacesList(1));
