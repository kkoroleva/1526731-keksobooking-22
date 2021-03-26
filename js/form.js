import {
  getTypeOfPlace
} from './similar-place.js';
import {
  fetchDataToServer
} from './server.js';
import {
  resetFilter
} from './filter.js';

const DEFAULT_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};
const AD_FORM = document.querySelector('.ad-form');
const TITLE = AD_FORM.querySelector('#title');
const TYPE = AD_FORM.querySelector('#type');
const PRICE = AD_FORM.querySelector('#price');
const MIN_PRICE_TO_TYPE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const TIME_FIELDSET = AD_FORM.querySelector('.ad-form__element--time');
const ROOMS_FIELDSET = AD_FORM.querySelector('#room_number');
const ADDRESS_FIELD = AD_FORM.querySelector('#address');
const MAIN = document.querySelector('main');

TITLE.addEventListener('input', () => {
  if (TITLE.validity.tooShort) {
    const customAlert = `Заголовок объявления должен быть длиной не менее ${TITLE.minLength} симв. Пожалуйста, добавьте ${TITLE.minLength - TITLE.value.length} симв.`;
    TITLE.setCustomValidity(customAlert);
  } else if (TITLE.validity.tooLong) {
    const customAlert = `Заголовок объявления должен быть длиной не более ${TITLE.maxLength} симв. Пожалуйста, уберите ${TITLE.value.length - TITLE.maxLength} симв.`;
    TITLE.setCustomValidity(customAlert);
  } else {
    TITLE.setCustomValidity('');
  }
  TITLE.reportValidity();
});

const checkPriceValidity = () => {
  if (PRICE.validity.rangeUnderflow) {
    const customAlert = `Стоимость для размещения типа "${getTypeOfPlace(TYPE.value)}" должна быть больше ${PRICE.min}.`;
    PRICE.setCustomValidity(customAlert);
  } else if (PRICE.validity.rangeOverflow) {
    const customAlert = `Стоимость за ночь не может превышать ${PRICE.max}.`;
    PRICE.setCustomValidity(customAlert);
  } else {
    PRICE.setCustomValidity('');
  }
  PRICE.reportValidity();
};

const setPriceToType = (value) => {
  PRICE.placeholder = MIN_PRICE_TO_TYPE[value];
  PRICE.min = MIN_PRICE_TO_TYPE[value];
};

TYPE.addEventListener('change', (evt) => {
  setPriceToType(evt.target.value);
  checkPriceValidity();
});

PRICE.addEventListener('input', () => {
  checkPriceValidity();
});

const setCheckInOutTime = (data) => {
  const timein = TIME_FIELDSET.querySelector('#timein');
  const timeout = TIME_FIELDSET.querySelector('#timeout');
  timeout.value = data;
  timein.value = data;
};

TIME_FIELDSET.addEventListener('change', (evt) => {
  setCheckInOutTime(evt.target.value);
});

const syncRoomsAndGuests = (value) => {
  const guestsFieldset = AD_FORM.querySelector('#capacity');
  const guestOptions = guestsFieldset.querySelectorAll('option');
  const roomsToGuestsSyncLogic = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  guestOptions.forEach(field => {
    if (roomsToGuestsSyncLogic[value].includes(field.value)) {
      field.selected = true;
      field.disabled = false;
    } else {
      field.disabled = true;
    }
  });
}

ROOMS_FIELDSET.addEventListener('change', (evt) => {
  syncRoomsAndGuests(evt.target.value);
});

const setCoordinates = (lat = DEFAULT_COORDINATES.lat, lng = DEFAULT_COORDINATES.lng) => {
  ADDRESS_FIELD.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

const formReset = () => {
  TITLE.value = '';
  TYPE.value = 'house';
  PRICE.value = '';
  setCoordinates();
  setPriceToType(TYPE.value);
  ROOMS_FIELDSET.querySelector('option').selected = true;
  syncRoomsAndGuests('1');
  setCheckInOutTime('12:00');
  AD_FORM.querySelector('#avatar').value = '';
  AD_FORM.querySelector('#images').value = '';
  AD_FORM.querySelector('#description').value = '';
  const featuresFieldset = AD_FORM.querySelector('.features');
  const features = featuresFieldset.querySelectorAll('input');
  features.forEach(feature => {
    feature.checked = false;
  });
};

AD_FORM.addEventListener('reset', (evt) => {
  evt.preventDefault();
  formReset();
  resetFilter();
});
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const onDataSendSuccess = () => {
  MAIN.appendChild(successTemplate);
  successTemplate.addEventListener('click', () => {
    MAIN.removeChild(successTemplate);
  });
  successTemplate.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      MAIN.removeChild(successTemplate);
    }
  });
};
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const onDataSendError = () => {
  MAIN.appendChild(errorTemplate);
  errorTemplate.addEventListener('click', () => {
    MAIN.removeChild(errorTemplate);
  });
  errorTemplate.addEventListener('keydown', (evt) => {
    if (evt.key === ('Escape' || 'Esc')) {
      MAIN.removeChild(errorTemplate);
    }
  });
};

AD_FORM.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetchDataToServer(formData, onDataSendSuccess, onDataSendError, formReset);
});

const deactivateAdForm = () => {
  AD_FORM.classList.add('ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach(adFormElement => {
    adFormElement.disabled = true;
  });
};

const activateAdForm = () => {
  AD_FORM.classList.remove('ad-form--disabled');
  AD_FORM.querySelectorAll('fieldset').forEach(adFormElement => {
    adFormElement.disabled = false;
  });
  AD_FORM.querySelector('#address').readOnly = true;
  formReset();
};

deactivateAdForm();

export {
  activateAdForm,
  setCoordinates
};
