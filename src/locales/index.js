import ru from './ru.js';

export default (lng = 'ru') => ({
  lng,
  resources: { ru },
  debug: false,
});
