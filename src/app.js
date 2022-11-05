import i18n from 'i18next';
import _ from 'lodash';
import validateFields from './validators/validateFields.js';
import setLocales from './locales/index.js';
import initialState from './constants/initialState.js';
import createWatchedState from './watcher.js';
import loadContent from './actions/loadContent.js';
import refreshContent from './actions/refreshContent.js';

export default () => {
  const elements = {
    form: document.querySelector('form'),
    container: document.querySelector('.container-xxl'),
    feedbackElement: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    modal: {
      title: document.querySelector('.modal-title'),
      description: document.querySelector('.modal-body'),
      link: document.querySelector('.full-article'),
    },
    fields: {
      input: document.getElementById('url-input'),
    },
  };

  const i18nInstance = i18n.createInstance();
  i18nInstance.init(setLocales())
    .then(() => {
      const state = createWatchedState(initialState, elements, i18nInstance);
      refreshContent(state);

      Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
        fieldElement.addEventListener('input', (e) => {
          const { value } = e.target;
          state.form.fields[fieldName] = value;
        });
      });

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.form.processError = null;

        const validationErrors = validateFields(state.form.fields, state.urls, i18nInstance);

        if (!_.isEmpty(validationErrors)) {
          state.form.errors = validationErrors;
        } else {
          const lastUrl = state.form.fields.input;
          loadContent(state, lastUrl);
        }
      });
    })
    .catch((e) => console.error(e));
};
