const initialState = {
  urls: [],
  feeds: [],
  posts: [],
  viewedPosts: [],
  form: {
    processState: 'filling',
    processError: null,
    errors: {},
    fields: {
      input: '',
    },
  },
};

export default initialState;
