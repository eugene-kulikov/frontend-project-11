import * as yup from 'yup';
import { setLocale } from 'yup';
import _ from 'lodash';

const createYupSchema = (urls) => yup.object().shape({
  input: yup.string().url().notOneOf([urls]),
});

const validateFields = (fields, urls, i18nInstance) => {
  try {
    setLocale({
      mixed: {
        notOneOf: i18nInstance.t('errors.validation.urlAlreadyExists'),
      },
      string: {
        url: i18nInstance.t('errors.validation.invalidUrl'),
      },
    });
    createYupSchema(urls, i18nInstance).validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};

export default validateFields;
