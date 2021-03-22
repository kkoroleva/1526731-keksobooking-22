import {putMarkersOnMap} from './map.js';

const fetchDataFromServer = () => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((places) => {
      console.log(places);
      putMarkersOnMap(places);
    });
};

fetchDataFromServer();
