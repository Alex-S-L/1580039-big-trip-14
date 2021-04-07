const getRandomInteger = (from, to) => {
  return  Math.floor(from + (Math.random() * (to - from+ 1)));
};

export {getRandomInteger};
