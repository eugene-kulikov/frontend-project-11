import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import _ from 'lodash';
import validateFields from './validators/validateFields.js';
import render from './renderers/render.js';
import resources from './locales/index.js';
import parserRSS from './parsers/parserRSS.js';

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
      const initialState = {
        lng: defaultLanguage,
        urls: [],
        form: {
          processState: 'filling',
          urls: [],
          feeds: [],
          errors: {},
          fields: {
            input: '',
          },
        },
      };

      const watchedState = onChange(initialState, render(elements, initialState, i18nInstance));

      Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
        fieldElement.addEventListener('input', (e) => {
          const { value } = e.target;
          watchedState.form.fields[fieldName] = value;
        });
      });

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();

        const errors = validateFields(watchedState.form.fields, watchedState.urls, i18nInstance);

        if (!_.isEmpty(errors)) {
          watchedState.form.errors = errors;
        } else {
          watchedState.form.errors = [];
          const lastUrl = watchedState.form.fields.input;
          watchedState.urls = [...watchedState.urls, lastUrl];
          axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(lastUrl)}`)
            .then((response) => parserRSS(response.data.contents))
            .then((parsedData) => {
              console.log('watchedState before adding', watchedState.form.feeds);
              watchedState.form.feeds = [...watchedState.form.feeds, parsedData];
              watchedState.form.processState = 'successful';
              console.log('watchedState after adding', watchedState.form.feeds);
            })
            .catch(() => {
              console.log('error parser');
              watchedState.form.processState = 'invalid';
            });
          elements.fields.input.value = '';
          elements.fields.input.focus();
        }
      });
    })
    .catch((e) => console.error(e));
};
