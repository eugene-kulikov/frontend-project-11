import onChange from 'on-change';
import _ from 'lodash';
import validateFields from './validators/validateFields.js';
import render from './renderers/render.js';

export default () => {
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

  const state = onChange({
    urls: [],
    form: {
      processState: 'filling',
      urls: [],
      errors: {},
      fields: {
        input: '',
      },
    },
  }, render(elements));

  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    fieldElement.addEventListener('input', (e) => {
      const { value } = e.target;
      state.form.fields[fieldName] = value;
    });
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();

    const errors = validateFields(state.form.fields, state.urls);

    if (!_.isEmpty(errors)) {
      state.form.errors = errors;
    } else {
      state.urls = [...state.urls, state.form.fields.input];
      state.form.processState = 'successful';
      elements.fields.input.value = '';
      elements.fields.input.focus();
      state.form.processState = 'filling';
    }
  });
};
