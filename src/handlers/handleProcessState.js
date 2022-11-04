import renderFeeds from '../renderers/renderFeeds.js';
import renderPosts from '../renderers/renderPosts.js';

const handleProcessState = (state, elements, processState, i18nInstance) => {
  switch (processState) {
    case 'successful': {
      const listOfFeeds = renderFeeds(state, i18nInstance);
      const postsOfFeeds = renderPosts(state, i18nInstance);

      elements.feeds.innerHTML = listOfFeeds;
      elements.posts.innerHTML = postsOfFeeds;

      elements.fields.input.value = '';
      elements.fields.input.focus();
      break;
    }

    case 'loadedNewPosts': {
      const postsOfFeeds = renderPosts(state, i18nInstance);
      elements.posts.innerHTML = postsOfFeeds;
      break;
    }

    case 'filling':
      console.log('ProcessState filling');
      break;

    case 'sending':
      console.log('ProcessState sending');
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default handleProcessState;
