export default (state, i18nInstance) => `
    <div class="card border-0">
        <div class="card-body">
            <h2 class="card-title h4">${i18nInstance.t('content.feeds')}</h2>
        </div>
        <ul class="list-group border-0 rounded-0">
            ${state.feeds.map(({ title, description }) => `
                <li class="list-group-item border-0 border-end-0">
                    <h3 class="h6 m-0">${title}</h3>
                    <p class="m-0 small text-black-50">${description}</p>
                </li>
              `).join('')}
        </ul>
    </div>
`;
