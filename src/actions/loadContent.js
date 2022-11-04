import axios from 'axios';
import parserRSS from '../parsers/parserRSS.js';
import PROXY from '../constants/proxy.js';

const loadContent = (state, url) => {
  state.form.processState = 'sending';

  axios.get(PROXY + encodeURIComponent(url))
    .then((response) => {
      const { feeds, posts } = parserRSS(response.data.contents);
      state.feeds = [feeds, ...state.feeds];
      state.posts = [...posts, ...state.posts];
      state.urls = [...state.urls, url];
      state.form.errors = {};
      state.form.processState = 'successful';
    })
    .catch((err) => {
      console.log('loadContent error', err);
      if (err.name === 'AxiosError') {
        state.form.processError = 'networkError';
      } else if (err.name === 'invalidRSS') {
        state.form.processError = 'invalidRSS';
      } else {
        state.form.processError = 'unexpectedError';
      }
    });
};

export default loadContent;
