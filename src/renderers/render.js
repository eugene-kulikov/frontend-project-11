import handleProcessState from '../handlers/handleProcessState.js';
import renderErrors from './renderErrors.js';

const render = (elements, state, i18nInstance) => (path, value, prevValue) => {
  switch (path) {
    case 'lng':
      i18nInstance.changeLanguage(value).then(() => render(elements, i18nInstance));
      break;

    case 'form.processState':
      handleProcessState(elements, state, i18nInstance, value);
      break;

    case 'form.errors':
      renderErrors(elements, i18nInstance, value, prevValue);
      break;

    default:
      break;
  }
};

export default render;
