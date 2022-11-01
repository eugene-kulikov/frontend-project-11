export default (contents) => {
  try {
    const parser = new DOMParser();
    const data = parser.parseFromString(contents, 'text/xml');
    const feed = {
      title: data.querySelector('channel title').textContent,
      description: data.querySelector('channel description').textContent,
    };

    const topics = Array.from(data.querySelectorAll('item')).map((item) => {
      const topic = {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
      };
      return topic;
    });

    return { feed, topics };
  } catch {
    throw new Error('Parsing error');
  }
};
