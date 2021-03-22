import {
  getTypeOfPlace
} from './similar-place.js';

const form = document.querySelector('.ad-form');

const title = form.querySelector('#title');
title.addEventListener('input', () => {
  if (title.validity.tooShort) {
    const customAlert = `Заголовок объявления должен быть длиной не менее ${title.minLength} симв. Пожалуйста, добавьте ${title.minLength - title.value.length} симв.`;
    title.setCustomValidity(customAlert);
  } else if (title.validity.tooLong) {
    const customAlert = `Заголовок объявления должен быть длиной не более ${title.maxLength} симв. Пожалуйста, уберите ${title.value.length - title.maxLength} симв.`;
    title.setCustomValidity(customAlert);
  } else {
    title.setCustomValidity('');
  }
  title.reportValidity();
});
const minPriceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const type = form.querySelector('#type');
const price = form.querySelector('#price');

const checkPriceValidity = () => {
  if (price.validity.rangeUnderflow) {
    const customAlert = `Стоимость для размещения типа "${getTypeOfPlace(type.value)}" должна быть больше ${price.min}.`;
    price.setCustomValidity(customAlert);
  } else if (price.validity.rangeOverflow) {
    const customAlert = `Стоимость за ночь не может превышать ${price.max}.`;
    price.setCustomValidity(customAlert);
  } else {
    price.setCustomValidity('');
  }
  price.reportValidity();
};

type.addEventListener('change', (evt) => {
  price.placeholder = minPriceToType[evt.target.value];
  price.min = minPriceToType[evt.target.value];
  checkPriceValidity();
});

price.addEventListener('input', () => {
  checkPriceValidity();
});

const timeFieldset = form.querySelector('.ad-form__element--time');
timeFieldset.addEventListener('change', (evt) => {
  const timein = timeFieldset.querySelector('#timein');
  const timeout = timeFieldset.querySelector('#timeout');
  timeout.value = evt.target.value;
  timein.value = evt.target.value;
});

const roomsFieldset = form.querySelector('#room_number');
const guestsFieldset = form.querySelector('#capacity');
const guestOptions = guestsFieldset.querySelectorAll('option');

const syncRoomsAndGuests = (value) => {
  const map = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0'],
  };

  guestOptions.forEach(field => {
    if (map[value].includes(field.value)) {
      field.selected = true;
      const customAlert = 'Доступное количество гостей изменилось в связи с выбранным количеством комнат.';
      guestsFieldset.setCustomValidity(customAlert);
      guestsFieldset.reportValidity();
      field.disabled = false;
    } else {
      field.disabled = true;
    }
  });
}

roomsFieldset.addEventListener('change', (evt) => {
  syncRoomsAndGuests(evt.target.value);
});

const turnInactiveMode = () => {
  /* Нужно ли?
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.classList.add('ad-form--disabled');
  });*/
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(adFormElement => {
    adFormElement.disabled = true;
  });
  const filterForm = document.querySelector('.map__filters');
  filterForm.classList.add('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach(filterFormElement => {
    filterFormElement.disabled = true;
  });
  filterForm.querySelector('fieldset').disabled = true;
};

const addressField = form.querySelector('#address');
const turnActiveMode = () => {
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach(adFormElement => {
    adFormElement.disabled = false;
  });
  adForm.querySelector('#address').setAttribute('readonly', 'readonly');
  //adForm.querySelector('#address').readonly = 'readonly'; Как через точку сделать?
  const filterForm = document.querySelector('.map__filters');
  filterForm.classList.remove('ad-form--disabled');
  filterForm.querySelectorAll('select').forEach(filterFormElement => {
    filterFormElement.disabled = false;
  });
  filterForm.querySelector('fieldset').disabled = false;

  //Валидация полей до начала внесения изменений
  price.min = minPriceToType[type.value];
  guestOptions.forEach(field => {
    if (field.value !== '1') {
      field.disabled = true;
    }
  });
  addressField.value = '35.67500, 139.75000';
};

const setCoordinates = (lat, lng) => {
  addressField.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

turnInactiveMode();

export {
  turnActiveMode,
  setCoordinates
};
