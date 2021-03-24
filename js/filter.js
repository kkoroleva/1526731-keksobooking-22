
const FILTER_FORM = document.querySelector('.map__filters');
const SELECT_FILTERS = FILTER_FORM.querySelectorAll('select');
const CHECKBOX_FILTER = FILTER_FORM.querySelector('fieldset');

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

deactivateFilter();

export {activateFilter, resetFilter};
