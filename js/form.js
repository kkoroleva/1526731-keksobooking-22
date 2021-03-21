const form = document.querySelector('.ad-form');

const minPriceToType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};
const type = form.querySelector('#type');
type.addEventListener('change', (evt) => {
  const price = form.querySelector('#price');
  price.placeholder = minPriceToType[evt.target.value];
  price.min = minPriceToType[evt.target.value];
});

const timeFieldset = form.querySelector('.ad-form__element--time');
timeFieldset.addEventListener('change', (evt) => {
  const timein = timeFieldset.querySelector('#timein');
  const timeout = timeFieldset.querySelector('#timeout');
  timeout.value = evt.target.value;
  timein.value = evt.target.value;
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
};

const setCoordinates = (lat, lng) => {
  const addressField = form.querySelector('#address');
  addressField.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

turnInactiveMode();

export {turnActiveMode, setCoordinates};
