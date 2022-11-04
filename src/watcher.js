import onChange from 'on-change';
import handleProcessState from './handlers/handleProcessState.js';
import renderFormErrors from './renderers/renderFormErrors.js';
import handleProcessError from './handlers/handleProcessError.js';

const createWatchedState = (state, elements, i18nInstance) => onChange(
  state,
  (path, value, prevValue) => {
    switch (path) {
      case 'lng':
        i18nInstance.changeLanguage(value).then(() => createWatchedState(elements, i18nInstance));
        break;

      case 'form.processState':
        handleProcessState(state, elements, value, i18nInstance);
        break;

      case 'form.processError':
        handleProcessError(value, i18nInstance);
        break;

      case 'form.errors':
        renderFormErrors(elements, value, prevValue, i18nInstance);
        break;

      default:
        break;
    }
  },
);

export default createWatchedState;
