export default ({ platform, initialState }) => {
  if (
    typeof platform === 'undefined' ||
    !/(client|server)/g.test(platform) ||
    typeof initialState === 'undefined' ||
    initialState === null
  ) {
    throw new Error('Platform must be specified as either server or client');
  }

  const defaultState = platform === 'server' ? [] : initialState;

  return (state = defaultState, { type, payload }) => {
    switch (type) {
      case 'WRITE_POSTS':
        return [...payload.posts];
      default:
        return state;
    }
  };
};
