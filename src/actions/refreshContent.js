import axios from 'axios';
import PROXY from '../constants/proxy.js';
import REFRESH_INTERVAL from '../constants/refreshInterval.js';
import parserRSS from '../parsers/parserRSS.js';

const refreshContent = (state) => {
  const loadContents = () => {
    const observableUrls = state.urls.map((url) => axios.get(PROXY + url));

    Promise.all(observableUrls)
      .then((responses) => {
        const postsAll = Array.from(state.posts);
        const postsLoaded = responses.reduce((acc, response) => {
          const { posts } = parserRSS(response.data.contents);
          return [...acc, ...posts];
        }, []);
        const newPosts = _.differenceBy(postsLoaded, postsAll, 'title')
          .map((post) => ({ ...post }));
        if (newPosts.length !== 0) {
          state.posts = [...newPosts, ...state.form.feeds.posts];
          state.form.processState = 'loadedNewPosts';
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setTimeout(loadContents, REFRESH_INTERVAL));
  };
  setTimeout(loadContents, REFRESH_INTERVAL);
};

export default refreshContent;
