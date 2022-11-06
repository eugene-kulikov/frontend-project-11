import renderFeeds from '../renderers/renderFeeds.js';
import renderPosts from '../renderers/renderPosts.js';
import renderModal from '../renderers/renderModal.js';

const handleProcessState = (state, elements, processState, i18nInstance) => {
  switch (processState) {
    case 'successful': {
      const feeds = renderFeeds(state, i18nInstance);
      const posts = renderPosts(state, i18nInstance);

      elements.feeds.innerHTML = feeds;
      elements.posts.innerHTML = posts;

      elements.posts.querySelectorAll('button').forEach((btn) => {
        btn.addEventListener('click', renderModal(state, elements, btn));
        btn.removeEventListener('click', renderModal(state, elements, btn));
      });

      elements.fields.input.value = '';
      elements.fields.input.focus();
      break;
    }

    case 'loadedNewPosts': {
      const posts = renderPosts(state, i18nInstance);
      elements.posts.innerHTML = posts;
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
