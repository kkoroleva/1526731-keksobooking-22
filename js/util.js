//Utils
const getRandomFloat = (min = 0, max = 10000, roundConst = 0) => {
  if (min >= max || roundConst < 0 || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  roundConst = Math.ceil(roundConst);
  return (Math.random() * (max - min) + min).toFixed(roundConst);
};

const getRandomInt = (min = 0, max = 10000) => {
  if (min >= max || min < 0 || max < 0) {
    return 'Error. Некорректные входные данные';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    let shufflerIndex = getRandomInt(0, array.length - 1);
    let swap = array[i];
    array[i] = array[shufflerIndex];
    array[shufflerIndex] = swap;
  }
  return array;
};

const getRandomArray = (refArray) => {
  let resultLength = getRandomInt(1, refArray.length - 1);
  let resultArray = new Array(resultLength).fill(null);
  refArray = shuffleArray(refArray);
  for (let i = 0; i < resultLength; i++) {
    resultArray [i] = refArray [i];
  }
  return resultArray;
};

export {getRandomFloat, getRandomInt, getRandomArrayElement, getRandomArray};
