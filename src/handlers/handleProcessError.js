const handleprocessError = (processError, i18nInstance) => {
  switch (processError) {
    case 'invalidRSS':
    case 'networkError':
    case 'unexpectedError': {
      const feedbackElement = document.querySelector('.feedback');
      feedbackElement.classList.remove('text-success');
      feedbackElement.classList.add('text-danger');
      feedbackElement.textContent = i18nInstance.t(`errors.${processError}`);
      break;
    }

    case null:
      break;

    default:
      throw new Error(`Unknown process error: ${processError}`);
  }
};

export default handleprocessError;
