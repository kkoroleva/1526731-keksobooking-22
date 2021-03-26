import {
  activateAdForm,
  setCoordinates
} from './form.js';

import {
  fillCard
} from './similar-place.js';

import {
  findSimilarPlaces
} from './filter.js';

const DEFAULT_COORDINATES = {
  lat: 35.67500,
  lng: 139.75000,
};

const SIMILAR_ADS = 10;

/* global L:readonly */
const mapCanvas = L.map('map-canvas')
  .on('load', () => {
    activateAdForm();
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapCanvas);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(mapCanvas);

mainPinMarker.on('moveend', (evt) => {
  const coordinates = evt.target.getLatLng();
  setCoordinates(coordinates.lat, coordinates.lng);
});


const createBallon = (point) => {
  const similarPlaceTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarPlace = similarPlaceTemplate.cloneNode(true);
  fillCard(similarPlace, point);
  return similarPlace;
};

const clearMap = (markers) => {
  markers.forEach(marker => {
    marker.remove();
  });
  mainPinMarker.addTo(mapCanvas);
  markers = [];
  return markers;
};

const putMarkersOnMap = (pointsArr) => {
  const filtered = findSimilarPlaces(pointsArr).slice(0, SIMILAR_ADS);
  let markerList = [];
  filtered.forEach((filtered) => {
    const plainPinIcon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const plainPinMarker = L.marker(
      {
        lat: filtered.location.lat,
        lng: filtered.location.lng,
      },
      {
        icon: plainPinIcon,
      },
    );
    plainPinMarker.addTo(mapCanvas).bindPopup(createBallon(filtered));
    markerList.push(plainPinMarker);
  });
  return markerList;
};

//clearMap()

//submitData();

export {putMarkersOnMap, clearMap}
