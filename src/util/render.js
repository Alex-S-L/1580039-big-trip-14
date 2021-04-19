import Abstract from '../view/abstract.js';

const renderElement = (container, element, position) => {
  if(container instanceof Abstract) {
    container = container.getElement();
  }

  if(element instanceof Abstract) {
    element = element.getElement();
  }

  if (position !== 'begin' && position !== 'end') {
    throw new Error('Некорректное значение position');
  }
  const positionVariants = {
    begin: 'prepend',
    end: 'append',
  };

  container[positionVariants[position]](element);
};

const replaceElements = (newElement, oldElement) => {
  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }

  const parent = oldElement.parentElement;

  if (oldElement === null || newElement === null || parent === null) {
    throw new Error('unexisting elements');
  }

  parent.replaceChild(newElement, oldElement);
};

const turnTemplateIntoElement = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;

  return container.firstChild;
};

export {turnTemplateIntoElement, renderElement, replaceElements};
