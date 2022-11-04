class ParsingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalidRSS';
  }
}

export default (contents) => {
  try {
    const parser = new DOMParser();
    const data = parser.parseFromString(contents, 'text/xml');
    const feeds = {
      title: data.querySelector('channel title').textContent,
      description: data.querySelector('channel description').textContent,
    };

    const posts = Array.from(data.querySelectorAll('item')).map((item) => {
      const post = {
        title: item.querySelector('title').textContent,
        link: item.querySelector('link').textContent,
        description: item.querySelector('description').textContent,
      };
      return post;
    });

    return { feeds, posts };
  } catch {
    throw new ParsingError('Parsing error');
  }
};
