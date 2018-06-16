export default ({ platform, initialState }) => (
  state = platform === 'server'
    ? { text: 'Hello from the server!' }
    : initialState,
  { type, payload }
) => {
  switch (type) {
    case 'ADD':
      return { text: payload };
    case 'REMOVE':
      return { text: '' };
    default:
      return state;
  }
};
