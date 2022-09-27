import onChange from 'on-change';
import i18n from 'i18next';
import _ from 'lodash';
import validateFields from './validators/validateFields.js';
import render from './renderers/render.js';
import resources from './locales/index.js';

export default () => {
  const defaultLanguage = 'ru';

  const elements = {
    form: document.querySelector('form'),
    container: document.querySelector('.container-xxl'),
    feedbackElement: document.querySelector('.feedback'),
    feeds: document.querySelector('.feeds'),
    posts: document.querySelector('.posts'),
    fields: {
      input: document.getElementById('url-input'),
    },
  };

  const i18nInstance = i18n.createInstance();

  i18nInstance.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })
    .then(() => {
      const state = onChange({
        lng: defaultLanguage,
        urls: [],
        form: {
          processState: 'filling',
          urls: [],
          errors: {},
          fields: {
            input: '',
          },
        },
      }, render(elements, i18nInstance));

      Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
        fieldElement.addEventListener('input', (e) => {
          const { value } = e.target;
          state.form.fields[fieldName] = value;
        });
      });

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errors = validateFields(state.form.fields, state.urls, i18nInstance);

        if (!_.isEmpty(errors)) {
          state.form.errors = errors;
        } else {
          state.form.errors = [];
          state.urls = [...state.urls, state.form.fields.input];
          state.form.processState = 'successful';
          elements.fields.input.value = '';
          elements.fields.input.focus();
          state.form.processState = 'filling';
        }
      });
    })
    .catch((e) => console.error(e));
};
