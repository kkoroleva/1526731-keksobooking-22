import {
  putMarkersOnMap
} from './map.js';
import {
  activateFilter,
  resetFilter
} from './filter.js';
/*import {
  submitData
} from './form.js';*/

import {onFilterChange} from './filter.js';

const onErrorDataLoading = () => {
  const errorMessage = document.createElement('p');
  errorMessage.innerHTML = 'Попытка загрузить данные с сервера провалилась. <br> Список похожих объявлений и фильтр недоступны. Проверьте интернет cоединение и обновите страницу.';
  errorMessage.style = 'text-align: center;';
  const errorBlock = document.createElement('div');
  errorBlock.appendChild(errorMessage);
  errorBlock.style = 'width: 100%; heigth: 40px; background-color: red; color: white; position: relative;';
  const map = document.querySelector('.map');
  map.appendChild(errorBlock);
};

const fetchDataFromServer = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((places) => {
      const markers = putMarkersOnMap(places);
      activateFilter();
      const newPlaces = places.slice();
      onFilterChange(newPlaces, markers);
    })
    .catch(() => {
      onErrorDataLoading();
    });
};


const fetchDataToServer = (formData, onDataSendSuccess, onDataSendError, formReset) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking', {
      method: 'POST',
      type: 'multipart/form-data',
      body: formData,
    })
    .then((response) => response.json())
    .then(() => {
      onDataSendSuccess();
      formReset();
      resetFilter();
    })
    .catch(() => {
      onDataSendError();
    });
};

fetchDataFromServer();

export {
  fetchDataToServer
};
