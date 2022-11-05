export default (state, i18nInstance) => `
    <div class="card border-0">
        <div class="card-body">
            <h2 class="card-title h4">${i18nInstance.t('content.posts')}</h2>
        </div>
        <ul class="list-group border-0 rounded-0">
            ${state.posts.map(({ title, link, id }) => `
              <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
                  <a href="${link}" class="${state.viewedPosts.includes(id) ? 'fw-normal link-secondary' : 'fw-bold'}"
                   data-id="${id}" target="_blank" rel="noopener noreferrer">${title}</a>
                  <button type="button" class="btn btn-outline-primary btn-sm" data-id="${id}"
                   data-bs-toggle="modal" data-bs-target="#modal">${i18nInstance.t('content.view')}</button>
               </li>
            `).join('')}
        <ul>
    </div>
`;
