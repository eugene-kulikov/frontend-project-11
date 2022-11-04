const initialState = {
  urls: [],
  feeds: [],
  posts: [],
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
