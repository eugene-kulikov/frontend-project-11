import _ from 'lodash';

const handleProcessState = (elements, state, i18nInstance, processState) => {
  switch (processState) {
    case 'successful': {
      const feeds = document.querySelector('.feeds');
      const posts = document.querySelector('.posts');

      const listOfFeeds = `
       <div class="card border-0">
        <div class="card-body">
          <h2 class="card-title h4">${i18nInstance.t('content.feeds')}</h2>
        </div>
        <ul class="list-group border-0 rounded-0">
            ${state.form.feeds.map(({ feed }) => `
                <li class="list-group-item border-0 border-end-0">
                  <h3 class="h6 m-0">${feed.title}</h3>
                  <p class="m-0 small text-black-50">${feed.description}</p>
                </li>
              `)}
        </ul>
      </div>`;

      const postsOfFeeds = `
        <div class="card border-0">
            <div class="card-body">
              <h2 class="card-title h4">${i18nInstance.t('content.topics')}</h2>
            </div>
            <ul class="list-group border-0 rounded-0">
              ${state.form.feeds.map((elem) => elem.topics.map(({ title, link }) => `
                <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                  <a href="${link}" class="fw-bold" data-id="${_.uniqueId()}" target="_blank" rel="noopener noreferrer">${title}</a>
                  <button type="button" class="btn btn-outline-primary btn-sm" data-id="_.uniqueId()" data-bs-toggle="modal"
                  data-bs-target="#modal">${i18nInstance.t('content.view')}</button>
                </li>
                `).join('')).join('')}
            <ul>
        </div>
      `;

      feeds.innerHTML = listOfFeeds;
      posts.innerHTML = postsOfFeeds;
      break;
    }

    case 'filling':
      console.log('filling');
      break;

    case 'invalid': {
      const feedbackElement = document.querySelector('.feedback');
      feedbackElement.classList.remove('text-success');
      feedbackElement.classList.add('text-danger');
      feedbackElement.textContent = i18nInstance.t('validation.errors.invalid');
      break;
    }

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default handleProcessState;
