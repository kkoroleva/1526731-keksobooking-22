const getTypeOfPlace = (typeData) => {
  const typesDictionary = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalow: 'Бунгало',
  };
  return typesDictionary[typeData];
};

const getCapacityGuests = (guests) => {
  if (guests % 10 === 1) {
    return guests + ' гостя';
  }
  return guests + ' гостей';
};

const getCapacityRooms = (rooms) => {
  if (rooms < 20 && rooms > 10) {
    return rooms + ' комнат для ';
  }
  if (rooms % 10 === 1) {
    return rooms + ' комната для ';
  } else if (rooms % 10 < 5 && rooms % 10 > 1) {
    return rooms + ' комнаты для ';
  }
  return rooms + ' комнат для ';
};

const getPhotos = (place, photosData) => {
  const popupPhotos = place.querySelector('.popup__photos');
  const photoTemplate = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(photoTemplate);
  const photoGallery = document.createDocumentFragment();
  photosData.forEach(photoData => {
    const img = photoTemplate.cloneNode(true);
    img.src = photoData;
    photoGallery.appendChild(img);
  });
  return photoGallery;
};

const getFeatures = (place, featuresData) => {
  const popupFeatures = place.querySelector('.popup__features');
  popupFeatures.innerHTML = '';

  const featuresFragment = document.createDocumentFragment();
  const featureTemplate = document.createElement('li');
  featureTemplate.classList.add('popup__feature');

  featuresData.forEach(featuresData => {
    const feature = featureTemplate.cloneNode(true);
    feature.classList.add(`popup__feature--${featuresData}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const addHidden = (place, elementClass) => {
  place.querySelector(elementClass).classList.add('hidden');
};

const fillTextContent = (place, elementClass, content) => {
  if (content) {
    place.querySelector(elementClass).textContent = content;
  } else {
    addHidden(place, elementClass);
  }
};

const appendFragment = (place, elementClass, data, fragment) => {
  if (data.length !== 0) {
    place.querySelector(elementClass).appendChild(fragment);
  } else {
    addHidden(place, elementClass);
  }
};

const fillCard = (place, {
  author,
  offer,
}) => {
  const popupAvatar = place.querySelector('.popup__avatar');
  author.avatar ? popupAvatar.src = author.avatar : addHidden(place, '.popup__avatar');

  fillTextContent(place, '.popup__title', offer.title);
  fillTextContent(place, '.popup__text--address', offer.address);
  fillTextContent(place, '.popup__text--price', `${offer.price} ₽/ночь`);
  fillTextContent(place, '.popup__type', getTypeOfPlace(offer.type));
  fillTextContent(place, '.popup__description', offer.description);

  (offer.rooms !== undefined && offer.guests !== undefined) ? fillTextContent(place, '.popup__text--capacity', `${getCapacityRooms(offer.rooms)} ${getCapacityGuests(offer.guests)}`) : addHidden(place, '.popup__text--capacity');
  (offer.checkin && offer.checkout) ? fillTextContent(place, '.popup__text--time', `Заезд после ${offer.checkin} выезд до ${offer.checkout}`) : addHidden(place, '.popup__text--time');

  appendFragment(place, '.popup__features', offer.features, getFeatures(place, offer.features));
  appendFragment(place, '.popup__photos', offer.photos, getPhotos(place, offer.photos));
};

export {fillCard, getTypeOfPlace};
