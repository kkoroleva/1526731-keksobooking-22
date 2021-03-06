import {
  putMarkersOnMap,
  clearMap
} from './map.js';

const FILTER_FORM = document.querySelector('.map__filters');
const SELECT_FILTERS = FILTER_FORM.querySelectorAll('select');
const CHECKBOX_FILTER = FILTER_FORM.querySelector('fieldset');
const FILTER_DELAY = 1000;

const resetFilter = () => {
  SELECT_FILTERS.forEach(filterFormElement => {
    filterFormElement.querySelector('option').selected = true;
  });
  CHECKBOX_FILTER.querySelectorAll('input').forEach(checkbox => {
    checkbox.checked = false;
  });
};

const deactivateFilter = () => {
  FILTER_FORM.classList.add('ad-form--disabled');
  SELECT_FILTERS.forEach(filterFormElement => {
    filterFormElement.disabled = true;
  });
  CHECKBOX_FILTER.disabled = true;
};

const activateFilter = () => {
  FILTER_FORM.classList.remove('ad-form--disabled');
  SELECT_FILTERS.forEach(filterFormElement => {
    filterFormElement.disabled = false;
  });
  CHECKBOX_FILTER.disabled = false;
};

const checkIfSimilarType = (type, enteredType) => {
  return (type === enteredType || enteredType === 'any');
};

const checkIfSimilarPrice = (price, enteredPrice) => {
  const lowPriceTop = 10000;
  const middlePriceTop = 50000;
  switch (enteredPrice) {
    case 'any':
      return true;
    case 'low':
      return (price < lowPriceTop && price >= 0);
    case 'middle':
      return (price >= lowPriceTop && price < middlePriceTop);
    case 'high':
      return price >= middlePriceTop;
    default:
      return false;
  }
};

const checkIfSimilarRooms = (rooms, enteredRooms) => {
  return (String(rooms) === enteredRooms || enteredRooms === 'any');
};

const checkIfSimilarGuests = (guests, enteredGuests) => {
  return (String(guests) === enteredGuests || enteredGuests === 'any');
};

const checkIfSimilarFeatures = (features, enteredFeatures) => {
  let flag = true;
  if (enteredFeatures.length === 0) {
    return flag;
  }
  else if (features.length > 0 && enteredFeatures.length > 0) {
    enteredFeatures.forEach(enteredFeature => {
      if (features.includes(enteredFeature) === false) {
        flag = false;
      }
    });
  }
  else if (features.length === 0) {
    flag = false;
  }
  return flag;
};

const checkIfSimilarPlace = (offer, filter) => {
  return checkIfSimilarType(offer.type, filter.type)
  && checkIfSimilarPrice(offer.price, filter.price)
  && checkIfSimilarRooms(offer.rooms, filter.rooms)
  && checkIfSimilarGuests(offer.guests, filter.guests)
  && checkIfSimilarFeatures(offer.features, filter.features);
};

const getFeaturesFilter = (fieldset) => {
  const checkboxes = fieldset.querySelectorAll('input');
  let featuresFilter = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      featuresFilter.push(checkbox.value);
    }
  });
  return featuresFilter;
};

const findSimilarPlaces = (places) => {
  const filter = {
    type: FILTER_FORM.querySelector('#housing-type').selectedOptions[0].value,
    price: FILTER_FORM.querySelector('#housing-price').selectedOptions[0].value,
    rooms: FILTER_FORM.querySelector('#housing-rooms').selectedOptions[0].value,
    guests: FILTER_FORM.querySelector('#housing-guests').selectedOptions[0].value,
    features: getFeaturesFilter(FILTER_FORM.querySelector('#housing-features')),
  };
  let similarPlacesList = [];
  places.forEach(place => {
    if (checkIfSimilarPlace(place.offer, filter)) {
      similarPlacesList.push(place);
    }
  });
  return similarPlacesList;
};

/* global _:readonly */
const onFilterChange = (newPlaces, markers) => {
  FILTER_FORM.addEventListener('change', _.debounce(() => {
    markers = clearMap(markers);
    markers = putMarkersOnMap(newPlaces);
  }, FILTER_DELAY));
};

deactivateFilter();

export {
  activateFilter,
  resetFilter,
  findSimilarPlaces,
  onFilterChange
};
