import {putMarkersOnMap} from './map.js';
const SIMILAR_ADS = 10;

const onErrorDataLoading = () => {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'Попытка загрузить данные с сервера провалилась. Список похожих объявлений недоступен. Проверьте интернет cоединение и обновите страницу.';
  errorMessage.style = 'text-align: center;';
  const errorBlock = document.createElement('div');
  errorBlock.appendChild(errorMessage);
  errorBlock.style = 'width: 100%; heigth: 40px; background-color: red; color: white; position: relative;';
  const map = document.querySelector('.map');
  map.appendChild(errorBlock);
};

const fetchDataFromServer = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((places) => {
      putMarkersOnMap(places.slice(0, SIMILAR_ADS));
    })
    .catch(() => {
      onErrorDataLoading();
    });
};

fetchDataFromServer();
