const handleProcessState = (elements, processState) => {
  switch (processState) {
    case 'successful':
      if (!document.querySelector('.card-title')) {
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        const cardTitle = document.createElement('h2');
        cardTitle.classList.add('card-title', 'h4');
        cardTitle.textContent = 'Фиды';
        cardBody.appendChild(cardTitle);
        elements.feeds.appendChild(cardBody);
      }
      break;

    case 'filling':
      console.log('filling');
      break;

    default:
      throw new Error(`Unknown process state: ${processState}`);
  }
};

export default handleProcessState;
