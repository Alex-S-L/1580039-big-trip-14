const getRandomInteger = (from, to) => {

  return  Math.floor(from + (Math.random() * (to - from + 1)));
};

const renderElement = (container, element, position) => {
  if (position !== 'begin' && position !== 'end') {
    throw new Error('Некорректное значение position');
  }
  const positionVariants = {
    begin: 'prepend',
    end: 'append',
  };

  container[positionVariants[position]](element);
};

const turnTemplateIntoElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.firstChild;
};

export {getRandomInteger, turnTemplateIntoElement, renderElement};
