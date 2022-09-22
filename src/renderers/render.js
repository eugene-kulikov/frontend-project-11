import handleProcessState from '../handlers/handleProcessState.js';
import renderErrors from './renderErrors.js';

const render = (elements) => (path, value, prevValue) => {
  switch (path) {
    case 'form.processState':
      handleProcessState(elements, value);
      break;

    case 'form.errors':
      renderErrors(elements, value, prevValue);
      break;

    default:
      break;
  }
};

export default render;
