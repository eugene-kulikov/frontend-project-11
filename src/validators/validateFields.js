import * as yup from 'yup';
import _ from 'lodash';

const createYupSchema = (urls) => yup.object().shape({
  input: yup.string().url('Ссылка должна быть валидным URL').notOneOf(
    [urls],
    'RSS уже существует',
  ),
});

const validateFields = (fields, urls) => {
  try {
    createYupSchema(urls).validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return _.keyBy(e.inner, 'path');
  }
};

export default validateFields;
