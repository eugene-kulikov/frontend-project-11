import _ from 'lodash';

const renderErrors = (elements, i18nInstance, errors, prevErrors) => {
  Object.entries(elements.fields).forEach(([fieldName, fieldElement]) => {
    const error = errors[fieldName];
    const fieldHadError = _.has(prevErrors, fieldName);
    const fieldHasError = _.has(errors, fieldName);
    const feedbackElement = document.querySelector('.feedback');

    if ((!fieldHadError && !fieldHasError) || (fieldHadError && !fieldHasError)) {
      fieldElement.classList.remove('is-invalid');
      feedbackElement.classList.remove('text-danger');
      feedbackElement.classList.add('text-success');
      feedbackElement.textContent = i18nInstance.t('loading.uploadSuccess');
      return;
    }

    if (fieldHadError && fieldHasError) {
      feedbackElement.textContent = error.message;
      return;
    }

    fieldElement.classList.add('is-invalid');
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
    feedbackElement.textContent = error.message;
  });
};

export default renderErrors;
