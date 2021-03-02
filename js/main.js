'use strict'

const getRandomFloat = (min = 0, max = 0, roundConst = 0) => {
  if (min >= max || roundConst < 0 || min < 0 || max < 0) {
    console.log('Некорректные входные данные.');
    return 'Error';
  }
  roundConst = Math.ceil(roundConst);
  return (Math.random() * (max - min) + min).toFixed(roundConst);
};

const getRandomInt = (min = 0, max = 0) => {
  if (min >= max || min < 0 || max < 0) {
    console.log('Некорректные входные данные.');
    return 'Error';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};



