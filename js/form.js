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
